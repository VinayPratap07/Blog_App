const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfileForVisit,
  getAllUserProfile,
} = require("../Controllers/user_controllers");
const { requireAuth } = require("../Middlewares/authenticaton_middleware");
const { signUpValidation } = require("../Middlewares/validation_middleware");

const router = Router();

router.post("/register", signUpValidation, registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/all", requireAuth, getAllUserProfile);
router.get("/me", requireAuth, getCurrentUser);
router.get("/:id", requireAuth, getProfileForVisit);

module.exports = router;
