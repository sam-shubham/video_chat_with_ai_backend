import {
  deleteVectorWithId,
  getAllVectors,
} from "@/libs/vectorDataSets/vectorStorePDF";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await deleteVectorWithId(req.body.ids);
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
