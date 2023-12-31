import { SimilaritySearchVectorDatabase } from "@/libs/vectorDataSets/vectorStorePDF";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();

router.post(async (req, res) => {
  try {
    var response = await SimilaritySearchVectorDatabase(req.body.query);
    console.log(response);
    res.send({ success: true, data: response });
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
