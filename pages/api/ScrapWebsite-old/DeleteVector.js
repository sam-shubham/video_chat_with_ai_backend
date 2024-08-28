// import dbConnect from "@/libs/database/dbconnect";
// import openAiSettings from "@/libs/database/models/openAiSettings";
// import {
//   deleteVectors,
//   getAllVectors,
// } from "@/libs/vectorDataSetsPinecone/vectorStore";
// import { createRouter, expressWrapper } from "next-connect";
// const router = createRouter();

// router.post(async (req, res) => {
//   try {
//     await deleteVectors(req.body.ids);
//     var allvectors = await getAllVectors();
//     res.send({ success: true, data: allvectors });
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
