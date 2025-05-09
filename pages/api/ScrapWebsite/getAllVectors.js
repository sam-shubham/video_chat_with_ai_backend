import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import { getAllVectors } from "@/libs/vectorDataSets/vectorStore";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();

router.get(async (req, res) => {
  try {
    var allvectors = await getAllVectors();
    res.send({ success: true, data: { matches: allvectors } });
  } catch (error) {
    res.send({ success: false, data: { matches: allvectors } });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
