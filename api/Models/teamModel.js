const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
TeamSchema.pre(/^find/, function () {
  this.populate("users");
});
module.exports = mongoose.model("Team", TeamSchema);
