import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeClient } from "@pinecone-database/pinecone";
import * as fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { VectorDBQAChain, loadQAChain } from "langchain/chains";

const pinecone = new PineconeClient();

export async function deleteVectors(ids) {
  await pinecone.init({
    environment: `${process.env.PINECONE_ENVIRONMENT}`,
    apiKey: `${process.env.PINECONE_API_KEY}`,
  });
  const index = pinecone.Index("24justice");
  await index.delete1({
    ids: [ids],
    namespace: "allwebsites",
  });
}
export async function getAllVectors() {
  await pinecone.init({
    environment: `${process.env.PINECONE_ENVIRONMENT}`,
    apiKey: `${process.env.PINECONE_API_KEY}`,
  });
  const index = pinecone.Index("24justice");
  const queryRequest = {
    vector: new Array(1536).fill(0),
    topK: 10000,
    namespace: "allwebsites",
  };
  const queryResponse = await index.query({ queryRequest });
  return queryResponse;
}
export const addvectorStore = async (fullurl, textvalues) => {
  try {
    await pinecone.init({
      environment: `${process.env.PINECONE_ENVIRONMENT}`,
      apiKey: `${process.env.PINECONE_API_KEY}`,
    });
    const text = textvalues;

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });

    // create document objects of text
    var docs = await textSplitter.createDocuments([text]);
    docs = docs.map((el) => {
      delete el.metadata.loc;
      return el;
    });
    // console.log(docs);
    // return;
    const index = pinecone.Index("24justice");
    const embeddings = new OpenAIEmbeddings();
    await addDocuments(docs, fullurl);

    async function addDocuments(documents, ids) {
      const texts = documents.map(({ pageContent }) => pageContent);
      return addVectors(await embeddings.embedDocuments(texts), documents, ids);
    }

    async function addVectors(vectors, documents, ids) {
      const upsertRequest = {
        vectors: vectors.map((values, idx) => ({
          id: ids + "/" + idx,
          metadata: {
            ...documents[idx].metadata,
            text: documents[idx].pageContent,
          },
          values,
        })),
        namespace: "allwebsites",
      };

      await index.upsert({
        upsertRequest,
      });
    }
    return true;
    // const indexData = await index.describeIndexStats({
    //   describeIndexStatsRequest: {},
    // });
    // console.log("indexData", indexData);
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
const embeddings = new OpenAIEmbeddings();

export async function callVectorDBQAChain(query) {
  const question = query;
  const returnedResults = 3;
  const questionEmbedding = await embedQuery(question, embeddings);
  await pinecone.init({
    environment: `${process.env.PINECONE_ENVIRONMENT}`,
    apiKey: `${process.env.PINECONE_API_KEY}`,
  });
  const index = pinecone.Index("24justice");
  const docs = await similarityVectorSearch(
    questionEmbedding,
    returnedResults,
    index,
    "allwebsites"
  );
  return docs.join(" ");
}

//vectorstore
export async function embedQuery(query, embeddings) {
  const embeddedQuery = await embeddings.embedQuery(query);
  return embeddedQuery;
}
//change the namespace to match your vectorbase
export async function similarityVectorSearch(
  vectorQuery,
  k = 3,
  index,
  namespace
) {
  const results = await index.query({
    queryRequest: {
      topK: k,
      includeMetadata: true,
      vector: vectorQuery,
      namespace,
    },
  });

  const result = [];

  if (results.matches) {
    for (const res of results.matches) {
      const { text: pageContent, ...metadata } = res?.metadata;
      if (res.score) {
        result.push([pageContent]);
      }
    }
  }
  return result.map((result) => result[0]);
}
