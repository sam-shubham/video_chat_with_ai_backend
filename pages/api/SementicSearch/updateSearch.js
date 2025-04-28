var { HNSWLib } = require("langchain/vectorstores/hnswlib");
var { PDFLoader } = require("langchain/document_loaders/fs/pdf");
var { OpenAIEmbeddings } = require("langchain/embeddings/openai");
import { createRouter, expressWrapper } from "next-connect";
import fs from "fs";
import path from "path";
var { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const router = createRouter();
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
});

router.get(async (req, res) => {
  try {
    var alldocs = [];
    var allDocuments = fs.readdirSync("refrences/pdf/");
    if (!allDocuments[0]) {
      await fs.rmSync(process.env.HNSWLibvectorPath, {
        recursive: true,
        force: true,
      });
      res.send({ success: false, msg: "Folder Empty!" });
      return;
    }
    for (const pathname of allDocuments) {
      var singledocs = await loadManyDocuments("refrences/pdf/" + pathname);
      alldocs = [...alldocs, ...singledocs];
    }
    await addHNSWLibDocument(alldocs);
    res.send({ success: true, msg: "updated" });
  } catch (error) {
    res.send({ success: false, msg: "Sementic Search Error" });

    console.log(error?.response?.data || error);
  }
});
async function loadManyDocuments(path) {
  const loader = new PDFLoader(path);

  const docs = await loader.loadAndSplit(textSplitter);
  return docs;
}

async function addHNSWLibDocument(docs) {
  const vectorStore = await HNSWLib.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI,
      //   modelName: "text-embedding-ada-002",
    })
  );

  await vectorStore.save(process.env.HNSWLibvectorPath);
  return true;
}
export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
