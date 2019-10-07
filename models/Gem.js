const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GemSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    goodToKnow: String,
    latitude: Number,
    longitude: Number,
    imageUrl: {
      type: String,
      default: "some default url we need to add for image"
    },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    discovery: Boolean,
    latitude: Number,
    longitude: Number,
    locationName: String,
    category: {
      type: String,
      enum: [
        "foodDrinks",
        "cultureArts",
        "hikes",
        "nature",
        "party",
        "sports",
        "others"
      ]
    },
    visitedDate: {
      type: Date,
      //   default: Date.now()
      default: new Date()
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Gem = mongoose.model("Gem", GemSchema);
module.exports = Gem;
