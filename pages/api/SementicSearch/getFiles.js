import axios from "axios";
import { createRouter, expressWrapper } from "next-connect";
import path from "path";
import fs from "fs";
const router = createRouter();

router.get(async (req, res) => {
  try {
    var allDocuments = await fs.readdirSync("refrences/pdf/");
    allDocuments = allDocuments.map((el) => {
      var stats = fs.statSync("refrences/pdf/" + el);
      var UploadedOn = new Date(stats.birthtime).toDateString();
      var fileSizeInBytes = stats.size;
      var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

      return {
        fileName: el.split("-")[1],
        UploadedOn: UploadedOn,
        fileSize: `${parseFloat(fileSizeInMegabytes).toFixed(5)} MB`,
        filePath: "refrences/pdf/" + el,
      };
    });
    res.send({ success: true, msg: allDocuments });
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
