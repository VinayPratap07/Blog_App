const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

likeSchema.index({ blog: 1, user: 1 }, { unique: true });

const BlogLike = model("likeCount", likeSchema);
module.exports = BlogLike;
