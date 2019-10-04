const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    facebookId: {
      type: String
    },
    googleId: {
      type: String
    },
    followers: Array,
    following: Array,
    profilePic: {
      type: String,
      default: "../client/public/images/defaultprofilepic.png"
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
