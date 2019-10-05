const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WisdomSchema = new Schema({
  quote: String,
  author: String
});

const Wisdom = mongoose.model("Wisdom", WisdomSchema);
module.exports = Wisdom;
