import axios from "axios";
import { createRouter, expressWrapper } from "next-connect";
import path from "path";
import fs from "fs";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await fs.rmSync(req.body.filePath);
    const protocol =
      req.headers["x-forwarded-proto"] ||
      (req.connection.encrypted ? "https" : "http");
    var url = protocol + "://" + req.headers.host;
    var axres = await axios
      .get(url + "/api/SementicSearch/updateSearch")
      .then((d) => d.data);
    if (axres.success) {
      res.send({ success: true, msg: "File Successfully Deleted!" });
    } else {
      res.send({ success: false, msg: axres.msg });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
