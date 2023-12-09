import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import { SimilaritySearchVectorDatabase } from "@/libs/vectorDataSets/vectorStore";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();

router.post(async (req, res) => {
  try {
    var { responsetext, userSpecificLink } =
      await SimilaritySearchVectorDatabase(req.body.query);
    res.send({ success: true, data: responsetext, userSpecificLink });
  } catch (error) {
    res.send({ success: false, data: [] });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
