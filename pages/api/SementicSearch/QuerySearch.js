var { HNSWLib } = require("langchain/vectorstores/hnswlib");
var { PDFLoader } = require("langchain/document_loaders/fs/pdf");
var { OpenAIEmbeddings } = require("langchain/embeddings/openai");
var { isWithinTokenLimit } = require("gpt-tokenizer/model/gpt-3.5-turbo");
import { createRouter, expressWrapper } from "next-connect";
import fs from "fs";
import path from "path";
const router = createRouter();

router.post(async (req, res) => {
  try {
    if (!fs.existsSync(process.env.HNSWLibvectorPath)) {
      res.send({ success: false, msg: "Sementic Search Error" });
      return;
    }
    var query_response = await SearchFromVectorStore(req.body.query);
    res.send({ success: true, msg: query_response });
  } catch (error) {
    res.send({ success: false, msg: "Sementic Search Error" });
  }
});
async function SearchFromVectorStore(query) {
  return new Promise(async (resolve, reject) => {
    const loadedVectorStore = await HNSWLib.load(
      process.env.HNSWLibvectorPath,
      new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI,
        //   modelName: "text-embedding-ada-002",
      })
    );
    var result = await loadedVectorStore.similaritySearch(query, 5);
    getTextInTokensLimit(
      result
        .map(({ pageContent }) => pageContent.replaceAll("\n", ""))
        .join("\n"),
      3000,
      (limitedRefrence) => {
        resolve(limitedRefrence);
      }
    );
  });
}
function getTextInTokensLimit(text, limit, callback) {
  if (isWithinTokenLimit(text, limit) == false) {
    getTextInTokensLimit(text.substr(0, text.length - 50), limit, callback);
  } else {
    callback(text);
  }
}
export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
