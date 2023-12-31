import multer from "multer";
import fs from "fs";
import { createRouter, expressWrapper } from "next-connect";
import { addvectorStore } from "@/libs/vectorDataSets/vectorStorePDF";
// import { addvectorStore } from "lib/vectorDataSetsPinecone/vectorStore_pdf";
const router = createRouter();
const pdf = require("pdf-parse");
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const upload = multer({
  storage: multer.diskStorage({
    destination: "allMediauploads/",
  }),
});

router.use(upload.single("file")); // attribute name you are sending the file by

router.post(async (req, res) => {
  try {
    let dataBuffer = fs.readFileSync(req.file.path);
    var { text } = await pdf(dataBuffer);
    // text = text.substring(0, 4000);
    fs.unlinkSync(req.file.path);
    // console.log(text);
    await addvectorStore(req.file.originalname, text);
    res.send({ success: true, data: "uploaded" });
    // console.log(req.file.path);
    //   cloudinary.uploader.upload(req.file.path, (result) => {
    //     fs.unlinkSync(req.file.path);
    //     res.send({ success: true, data: result.secure_url });
    //   });
  } catch (error) {
    if (req?.file?.path && fs.existsSync(req?.file?.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.log(error);
    res.send({ success: false, data: "Error Occured with Upload" });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
var opneaiRetries = {
  currentReties: 0,
  TotalRetries: 20,
};
var getresponsefromopenai = async (prompt, text, callbackforrespfromopenai) =>
  (async () => {
    var openaiSettings = {
      openaiFrequencyPenalty: "0",
      openaiTopP: "1",
      openaiTemperature: "0",
      openaiPresencePenalty: "0",
      //   openaiMaxLength: "300",
    };
    try {
      var response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: prompt,
          },

          { role: "user", content: text },
        ],
        temperature: Number(openaiSettings.openaiTemperature),
        max_tokens: Number(openaiSettings.openaiMaxLength),
        top_p: Number(openaiSettings.openaiTopP),
        presence_penalty: Number(openaiSettings.openaiPresencePenalty),
        frequency_penalty: Number(openaiSettings.openaiFrequencyPenalty),
      });
      callbackforrespfromopenai(response);
    } catch (error) {
      console.log(error?.response?.data || error);
      if (opneaiRetries.TotalRetries <= opneaiRetries.currentReties) {
        callbackforrespfromopenai(response);
      } else {
        getresponsefromopenai(prompt, text, callbackforrespfromopenai);
        opneaiRetries.currentReties++;
      }
    }
  })();
