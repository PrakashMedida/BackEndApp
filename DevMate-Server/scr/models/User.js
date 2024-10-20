const mongoose = require("mongoose");
const validator = require("validator");

const user = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    age: {
      type: Number,
      min: 18,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid Email Id!");
      },
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value))
          throw new Error("Gender can not be valid");
      },
    },
    skills: {
      type: [String],
      maxlength: 20,
    },
    about: {
      type: String,
      minlength: 3,
      default:"i'm Developer!"
    },
    profileURL:{
      type:String,
      
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", user);
