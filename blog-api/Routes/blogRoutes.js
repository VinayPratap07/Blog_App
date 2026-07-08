const { Router } = require("express");
const {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  popularPost,
  heroBlog,
  mostRecentBlogs,
  registerLikes,
  unLikeBlog,
} = require("../Controllers/blog_controllers");
const { upload } = require("../Middlewares/multer_middleware");

const router = Router();

router.get("/", getAllBlogs);
router.get("/popularPost", popularPost);
router.get("/heroBlog", heroBlog);
router.get("/mostRecentBlogs", mostRecentBlogs);
router.post("/", upload.single("thumbnail"), createBlog);

router.post("/:id/likes", registerLikes);
router.delete("/:id/likes", unLikeBlog);

router.put("/:id", updateBlog);
router.get("/:id", getSingleBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
