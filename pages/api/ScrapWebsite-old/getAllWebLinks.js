import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import axios from "axios";
import { createRouter, expressWrapper } from "next-connect";
const router = createRouter();
import { JSDOM } from "jsdom";

router.post(async (req, res) => {
  try {
    var mainUrl = new URL(req.body.url);
    var { data: axres } = await axios.get(req.body.url);
    var {
      window: { document: dom },
    } = new JSDOM(axres);
    var linkslist = Array.from(dom.querySelectorAll("a"));
    linkslist = linkslist.filter((el) =>
      el?.getAttribute("href") ? true : false
    );

    linkslist = linkslist.map((el) => el.getAttribute("href"));
    linkslist = [...new Set(linkslist)];
    linkslist = linkslist.filter((el) => {
      if (el[0] == "#" || el[1] == "#") {
        return false;
      } else {
        return true;
      }
    });
    linkslist = linkslist.sort((a, b) => a.length - b.length);
    linkslist = linkslist.map((el) =>
      el[0] == "/" ? `${mainUrl.protocol}//` + mainUrl.host + el : el
    );
    // linkslist = linkslist.filter((el) => {
    //   if (
    //     el.includes(new URL(req.body.url).host.split(".")[0]) ||
    //     el[0] == "/"
    //   ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    linkslist.splice(0, 0, req.body.url);
    res.send({ success: true, data: linkslist });
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
