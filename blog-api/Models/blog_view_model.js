const { Schema, model } = require("mongoose");

const blogViewSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

//Index is a special DataStructure that MongoDB creates to make search faster(like a book index)
blogViewSchema.index({ blog: 1, user: 1 }, { unique: true });

const BlogView = model("blogView", blogViewSchema);
module.exports = BlogView;
