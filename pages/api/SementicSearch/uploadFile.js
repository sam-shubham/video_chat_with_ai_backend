import axios from "axios";
import multer from "multer";
import { createRouter, expressWrapper } from "next-connect";
import path from "path";
const router = createRouter();

// Set up multer storage and options
const storage = multer.diskStorage({
  destination: "refrences/pdf",
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueSuffix +
        "-" +
        (file.originalname.includes(".")
          ? file.originalname.split(".")[0]
          : file.originalname) +
        "." +
        (file.originalname.includes(".") ? file.originalname.split(".")[1] : "")
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype != "application/pdf") {
      callback("We Are Currently Not Accepting File Other Than PDF.", false);
    } else {
      callback("", true);
    }
    // return false;
  },
});
export const config = {
  api: {
    bodyParser: false,
  },
};
router.use(upload.single("file")).post(async (req, res) => {
  try {
    // Access the uploaded file details
    const { originalname, path } = req.file;
    const protocol =
      req.headers["x-forwarded-proto"] ||
      (req.connection.encrypted ? "https" : "http");
    var url = protocol + "://" + req.headers.host;
    var axres = await axios
      .get(url + "/api/SementicSearch/updateSearch")
      .then((d) => d.data);
    if (axres.success) {
      res.send({ success: true, msg: "Updated" });
    } else {
      res.send(axres.msg);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "We Are Currently Not Accepting File Other Than PDF.",
    });
  }
  //   var allDocuments = fs.readdirSync(path.join(__dirname, "/refrences/pdf"));
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
