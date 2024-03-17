const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    mobileNo: {
      type: Number,
      required: true,
    },
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* Generating Acess Token  */

userSchema.methods.generateAccess_token = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      mobileNo: this.mobileNo,
      name: this.name,
    },
    process.env.ACESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACESS_TOKEN_EXPIRES,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
