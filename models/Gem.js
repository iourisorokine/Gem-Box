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
    locationName: String,
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dy9sawxrm/image/upload/v1570694936/gembox/defaults/default-gem_vuc6tg.png"
    },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    discovery: Boolean,
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
    likes: Array,
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
