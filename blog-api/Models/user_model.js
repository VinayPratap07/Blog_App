const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");
const { createTokenForUser } = require("../Service/auth");
const { type } = require("os");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("blogs", {
  ref: "blog",
  localField: "_id",
  foreignField: "createdBy",
});

// Mongoose pre-save middleware that hashes the user's password
// before storing it in the database.
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
});

// Static method used during login to verify user credentials.
// It hashes the provided password and compares it with the stored hash.
// If valid, a JWT authentication token is generated and returned.
userSchema.statics.matchPasswordAndGenerateToken = async function (
  identifier,
  password,
) {
  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) throw new Error("Invalid credentials");

  //We hash our user entered password and match it with our hashed password stored in DB
  const userProvidedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (userProvidedHash !== user.password)
    throw new Error("Invalid credentials");

  //If it matches we genereate a token and return it to our login controller
  return createTokenForUser(user);
};

const User = model("user", userSchema);
module.exports = User;
