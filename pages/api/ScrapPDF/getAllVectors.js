import { getAllVectors } from "@/libs/vectorDataSets/vectorStorePDF";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();

router.get(async (req, res) => {
  try {
    var allvectors = await getAllVectors();
    res.send({ success: true, data: { matches: allvectors } });
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
