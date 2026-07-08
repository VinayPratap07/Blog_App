const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    writtenBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    body: {
      type: String,
      required: true,
    },
    commentsFrom: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true },
);

const Comment = model("comment", commentSchema);
module.exports = Comment;
