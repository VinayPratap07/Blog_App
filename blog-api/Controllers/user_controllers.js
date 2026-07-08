const User = require("../Models/user_model");

async function registerUser(req, res) {
  console.log(req.body); // check this
  const { fullName, username, email, description, password } = req.body;

  try {
    const user = await User.create({
      fullName,
      username,
      email,
      description,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      userId: user._id,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];

      return res.status(409).json({
        message: `${field} already exists`,
      });
    }

    return res.status(500).json({ message: "Server error" });
  }
}

// Handles user login.
// Validates input fields and delegates credential verification to the model.
// If authentication succeeds, a JWT token is generated and stored in a cookie.
async function loginUser(req, res) {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Email/Username and password required" });
  }

  try {
    const token = await User.matchPasswordAndGenerateToken(
      identifier,
      password,
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "User logged in" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
}

//Removes cookie to log the user out we dont need to clear the req.body as it is created new with every request
async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out" });
}

//Function to get current loged in user
async function getCurrentUser(req, res) {
  try {
    const userId = req.user._id; //Get the user id set in req.body

    //Excluding the password and salt from the model
    const user = await User.findById(userId)
      .select("-password -salt")
      .populate("blogs");

    //Retrun error if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function getProfileForVisit(req, res) {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("-password -salt -email")
      .populate("blogs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
}

async function getAllUserProfile(req, res) {
  try {
    const users = await User.find().select("-password -salt");

    if (users.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching user" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfileForVisit,
  getAllUserProfile,
};
