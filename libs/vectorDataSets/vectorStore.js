import { ChromaClient } from "chromadb";
var client = new ChromaClient({
  path: "http://62.72.6.101:8000",
  auth: {
    credentials: "vectorDatabaseStore@#!321Appambient",
    provider: "token",
  },
});
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddingFunction } from "chromadb";
const embedder = new OpenAIEmbeddingFunction({
  openai_api_key: "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",
});

async function connectCollection() {
  try {
    return await client.getCollection({ name: "allwebsites" });
  } catch (error) {
    if (
      error.message.includes("Collection") &&
      error.message.includes("does not exist.")
    ) {
      var collectionName = error.message
        .split("Collection")[1]
        .split("does not exist.")[0]
        .trim();
      return await client.createCollection({
        name: collectionName,
      });
    } else {
      console.log(error);
    }

    // console.log("error", error);
  }
}

export const addvectorStore = async (fulurl, textvalues, userSpecificLink) => {
  try {
    var collection = await connectCollection();
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
    await addDocuments(docs, fulurl);

    async function addDocuments(documents, fulurl) {
      const texts = documents.map(({ pageContent }) => pageContent);
      return addVectors(await embedder.generate(texts), documents, fulurl);
    }
    async function addVectors(vectors, documents, ids) {
      try {
        var mapedvectors = vectors.map((values, idx) => ({
          ids: ids + "/" + idx,
          metadatas: {
            ...documents[idx].metadata,
            userSpecificLink: JSON.stringify(userSpecificLink),
            // SourceDetails: {
            //   linkArray: JSON.stringify(userSpecificLink),
            // },
            //   text: documents[idx].pageContent,
          },
          documents: documents[idx].pageContent,
          embeddings: values,
        }));

        for (const currentmapedvector of mapedvectors) {
          await collection.add(currentmapedvector);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export async function SimilaritySearchVectorDatabase(query) {
  try {
    var collection = await connectCollection();
    const embeddings = await embedder.generate(query);
    const result = await collection.query({
      queryEmbeddings: embeddings,
      nResults: 5,
    });
    return {
      responsetext: result.documents.join(" "),
      userSpecificLink: [
        ...new Set(
          result.metadatas[0].reduce((prev, curr) => {
            try {
              return [...prev, ...JSON.parse(curr.userSpecificLink)];
            } catch (error) {
              console.log(error);
              return [...prev, curr.userSpecificLink];
            }
            // prev.concat(curr);
          }, [])
        ),
      ],
    };
  } catch (error) {
    console.log("chroma-DB", error);
  }
}

export async function deleteVectorWithId(ids) {
  try {
    var collection = await connectCollection();
    await collection.delete({ ids: ids });
    return true;
  } catch (error) {
    return false;
    console.log(error);
  }
}

export async function getAllVectors() {
  try {
    var collection = await connectCollection();
    var queryResponse = await collection.get();
    var mapedids = queryResponse.ids.map((ids, idx) => ({
      id: ids,
      userSpecificLink: queryResponse?.metadatas[idx]?.userSpecificLink || "",
    }));
    return mapedids;
  } catch (error) {
    console.log(error);
  }
}
