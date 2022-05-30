const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["DOING", "DONE", "CANCEL"],
      },
      default: "DOING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
