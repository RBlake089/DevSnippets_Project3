const bcrypt = require('bcryptjs');
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: "Username is required",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Email is required",
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    password: {
      type: String,
      required: "Password is required",
      minlength: [6, "Password should be at least 6 characters long."],
    },
    snippets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Snippet",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Add the pre-save hook to hash the password before saving it to the database
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Add the comparePassword method to the UserSchema
UserSchema.methods.comparePassword = async function (password) {
  console.log(password + " first one");
  console.log(this.password + " second one");
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

const User = model("User", UserSchema);
module.exports = User;