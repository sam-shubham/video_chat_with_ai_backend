// import dbConnect from "@/libs/database/dbconnect";
// import openAiSettings from "@/libs/database/models/openAiSettings";
// import axios from "axios";
// import { createRouter, expressWrapper } from "next-connect";
// const router = createRouter();
// import { JSDOM } from "jsdom";
// import {
//   addvectorStore,
//   callVectorDBQAChain,
//   deleteVectors,
//   getAllVectors,
// } from "@/libs/vectorDataSetsPinecone/vectorStore";

// router.post(async (req, res) => {
//   try {
//     var allLinks = req.body.links;
//     var { userSpecificLink } = req.body;
//     var linksDetails = {};
//     for (const link of allLinks) {
//       new URL(link);
//     }
//     for (const link of allLinks) {
//       try {
//         var { data: axres } = await axios.get(link);

//         var {
//           window: { document },
//         } = new JSDOM(axres);
//         var alltext = "";
//         var alltextfunc = (txt) => {
//           if (Number(txt) != 0 && txt.length > 10) {
//             alltext += txt + "\n";
//           }
//         };
//         getTextContent(document.body, alltextfunc);

//         //   console.log(alltext);

//         var confirmedVectorAdded = await addvectorStore(
//           link,
//           alltext,
//           userSpecificLink
//         );
//       } catch (error) {}
//       //   console.log(await deleteVectors("https://adamglobal.com/about-us/"));
//       //   console.log(await callVectorDBQAChain("adamglobal"));
//       //   if (confirmedVectorAdded) {
//       // res.send({ success: true });
//       //   } else {
//       // res.send({ success: false });
//       //   }
//     }
//     var allvectors = await getAllVectors();
//     res.send({ success: true, data: allvectors });
//   } catch (error) {
//     console.log(error);
//     res.send({ success: false, data: [] });
//   }
// });

// var iligal = ["SCRIPT", "STYLE"];

// function getTextContent(el, callback) {
//   if (!iligal.includes(el.tagName)) {
//     if (el.childElementCount != 0) {
//       for (const ele of Array.from(el.children)) {
//         getTextContent(ele, callback);
//       }
//     } else if (el.textContent) {
//       callback(el.textContent.replace(/[\n\r]+/g, "\n").replace(/\s\s+/g, " "));
//     }
//   }
// }

// export default router.handler({
//   onError: (err, req, res) => {
//     console.log(err.stack);
//     res.status(err.statusCode || 500).end(err.message);
//   },
// });
