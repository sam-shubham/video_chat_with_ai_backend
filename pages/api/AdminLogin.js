import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();

router.post(async (req, res) => {
  if (atob(req.body.pass) == "aiadvancesiffie@!291") {
    res.send({ success: true, data: "" });
  } else {
    res.send({ success: false, data: "Check Credentials Again" });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
