const { Schema, model } = require('mongoose')
const {handleMongooseError} = require('../helpers')
const emailVal = /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: [6, 'Password should be at least 6 characters!'],
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailVal,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.post("save", handleMongooseError);
const User = model('user', userSchema)
module.exports = User