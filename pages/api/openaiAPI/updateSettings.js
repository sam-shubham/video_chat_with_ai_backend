import dbConnect from "@/libs/database/dbconnect";
import openAiSettings from "@/libs/database/models/openAiSettings";
import { createRouter } from "next-connect";
const router = createRouter();

router.post(async (req, res) => {
  var updateData = req.body.update;
  //   console.log(updateData);
  if (
    updateData.openaiPrompt != "null" &&
    updateData.openaiFrequencyPenalty != "null" &&
    updateData.openaiTopP != "null" &&
    updateData.openaiTemperature != "null" &&
    updateData.openaiPresencePenalty != "null" &&
    updateData.openaiMaxLength != "null"
  ) {
    await dbConnect();
    var dbres = await openAiSettings.findOneAndUpdate(
      {
        type: "openaiSettings",
      },
      {
        openaiSettings: {
          openaiPrompt: updateData.openaiPrompt || "",
          openaiFrequencyPenalty: updateData.openaiFrequencyPenalty || 0,
          openaiTopP: updateData.openaiTopP || 0,
          openaiTemperature: updateData.openaiTemperature || 0,
          openaiPresencePenalty: updateData.openaiPresencePenalty || 0,
          openaiMaxLength: updateData.openaiMaxLength || 0,
        },
      },
      { new: true }
    );
    res.send({ success: true, data: dbres });
  } else {
    res.send({ success: false, data: "unable to update" });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
