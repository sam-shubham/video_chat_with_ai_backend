// import dbConnect from "@/libs/database/dbconnect";
// import openAiSettings from "@/libs/database/models/openAiSettings";
// import {
//   callVectorDBQAChain,
//   deleteVectors,
//   getAllVectors,
// } from "@/libs/vectorDataSetsPinecone/vectorStore";
// import { createRouter, expressWrapper } from "next-connect";
// const router = createRouter();

// router.post(async (req, res) => {
//   try {
//     var response = await callVectorDBQAChain(req.body.query);
//     res.send({
//       success: true,
//       data: response.text,
//       userSpecificLink: response.userSpecificLink,
//     });
//   } catch (error) {
//     res.send({ success: false, data: [] });
//   }
// });

// export default router.handler({
//   onError: (err, req, res) => {
//     console.log(err.stack);
//     res.status(err.statusCode || 500).end(err.message);
//   },
// });
