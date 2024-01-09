import { createRouter, expressWrapper } from "next-connect";
import dbConnect from "@/libs/database/dbconnect";
import popularPrompts from "@/libs/database/models/popularPrompts";
const router = createRouter();
router.post(async (req, res) => {
  try {
    await dbConnect();
    var { allPopularPrompts } = await popularPrompts.findOneAndUpdate(
      {
        type: "allPopularPrompts",
      },
      { allPopularPrompts: req.body.popularPrompts },
      { new: true }
    );

    res.send({ status: true, allPopularPrompts });
  } catch (error) {
    res.send({ status: false });
  }
});
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
