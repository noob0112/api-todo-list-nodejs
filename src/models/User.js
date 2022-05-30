const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, max: 50 },
    email: { type: String, index:true, required: true, unique: true, max: 50 },
    password: { type: String, required: true },
    tasks: [{type: mongoose.Schema.ObjectId, ref: "Task"}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
