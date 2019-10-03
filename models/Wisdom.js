const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WisdomSchema = new Schema(
  {
    quote: String,
    author: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Wisdom = mongoose.model("Wisdom", WisdomSchema);
module.exports = Wisdom;
