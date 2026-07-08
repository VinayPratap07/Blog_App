const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    thumbnailPublicID: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Design", "Art", "Science"],
    },
    views: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

blogSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "commentsFrom",
});

const Blog = model("blog", blogSchema);

module.exports = Blog;
