const BlogLike = require("../Models/blog_like_model");
const Blog = require("../Models/blog_model");
const BlogView = require("../Models/blog_view_model");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

//Function to get all blogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().select("-thumbnailPublicID").populate({
      path: "createdBy",
      select: "-password -salt",
    }); //Populating it with createdBy so it sends user info with it instead of just id

    res.status(200).json(blogs); //Sending res code with the data in json format
  } catch (err) {
    res.status(500).json({ message: "Server error" }); //Error handling
  }
}

//Funciton to create/post a blog into Database
async function createBlog(req, res) {
  try {
    const { title, body, category } = req.body; //Extracting title and body from the req and adding it into the database

    //Validating the res so that mongo doesnt throw an error for it being empty
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Thumbnail is required",
      });
    }

    const thumbnailLocalPath = req.file.path;
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail) {
      return res.status(502).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id, //to add user id with it
      thumbnail: thumbnail.secure_url,
      thumbnailPublicID: thumbnail.public_id,
      category,
    });

    console.log(blog);
    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
//Function to get a single blog using blog id
async function getSingleBlog(req, res) {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId)
      .select("-thumbnailPublicID")
      .populate({
        path: "createdBy",
        select: "-password -salt",
      })
      .populate({
        path: "comments",
        populate: {
          path: "writtenBy",
          select: "fullName username",
        },
      });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const isLiked = await BlogLike.exists({
      blog: blogId,
      user: req.user._id,
    });

    //const liked = isLiked ? true : false; === isLiked: !!isLiked
    const response = {
      ...blog.toObject(),
      isLiked: !!isLiked,
    };

    if (req.user) {
      await registerView(blogId, req.user._id);
    }
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching blog" });
  }
}

//Function to delete a blog
async function deleteBlog(req, res) {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (blog.thumbnailPublicID) {
      const result = await deleteFromCloudinary(blog.thumbnailPublicID);

      if (result.result !== "ok" && result.result !== "not found") {
        return res.status(500).json({
          message: "Failed to delete image from Cloudinary",
        });
      }
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Cannot delete the blog. Try later!",
    });
  }
}

//Function to update a blog
async function updateBlog(req, res) {
  try {
    const blogId = req.params.id;
    const { title, body } = req.body; //Extracting title and body from the req

    // Validating the res so that mongo doesnt throw an error for it being empty
    // if (!title || !body) {
    //   return res.status(400).json({ message: "Title and body are required" });
    // }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, body },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cannot update blog. Try later!" });
  }
}

//Function for view count
async function registerView(blogId, userId) {
  try {
    await BlogView.create({
      blog: blogId,
      user: userId,
    });

    await Blog.findByIdAndUpdate(blogId, {
      $inc: { views: 1 },
    });
  } catch (err) {
    if (err.code !== 11000) {
      throw err;
    }
  }
}

//Funciton to register likes
async function registerLikes(req, res) {
  const blogId = req.params.id;
  const userId = req.user._id;

  try {
    await BlogLike.create({
      blog: blogId,
      user: userId,
    });

    await Blog.findByIdAndUpdate(blogId, {
      $inc: { likeCount: 1 },
    });

    return res.status(200).json({
      message: "Blog liked",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Already liked",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
}

//Unlike blog function
async function unLikeBlog(req, res) {
  const blogId = req.params.id;
  const userId = req.user._id;

  try {
    const deleted = await BlogLike.findOneAndDelete({
      blog: blogId,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Like not found",
      });
    }

    await Blog.findByIdAndUpdate(blogId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Blog unliked",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}

//Function to get most liked 15 blogs
async function mostRecentBlogs(req, res) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

//Function to get most viewd blogs
async function popularPost(req, res) {
  try {
    const blogs = await Blog.find().sort({ views: -1 }).limit(5);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
}

async function heroBlog(req, res) {
  try {
    const heroBlog = await Blog.find().sort({ views: -1, likes: -1 }).limit(1);

    res.status(200).json(heroBlog);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  registerLikes,
  unLikeBlog,
  mostRecentBlogs,
  popularPost,
  heroBlog,
};
