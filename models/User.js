const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    facebookId: {
      type: Number
    },
    googleId: {
      type: String
    },
    followers: Array,
    following: Array,
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dy9sawxrm/image/upload/v1570694942/gembox/defaults/default-profile_u9fsrx.png"
    },
    score: Number,
    travelInterests: String,
    notficationButton: Boolean,
    discovered: Number,
    explored: Number

    /* created: {
      type: Date,
      //   default: Date.now()
      default: new Date()
    } */
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
