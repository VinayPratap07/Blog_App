const Comment = require("../Models/comments_model");
const Blog = require("../Models/blog_model");

async function createComment(req, res) {
  try {
    const { body } = req.body;
    if (!body?.trim())
      return res.status(400).json({ message: "Comment body is required" });

    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    const comment = await Comment.create({
      body,
      writtenBy: req.user._id,
      commentsFrom: blogId,
    });
    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createComment,
};
