//Signup validation funciton to check the user input
async function signUpValidation(req, res, next) {
  const { fullName, username, email, description, password } = req.body;
  if (
    !fullName.trim() ||
    !username.trim() ||
    !email.trim() ||
    !description.trim() ||
    !password.trim()
  )
    return res.status(400).json({ message: "All fields are required" });
  if (password.trim().length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be atleast 8 characters" });
  }

  if (password.includes(" ") || username.includes(" ")) {
    return res
      .status(400)
      .json({ message: "Password and Username can not contain empty spaces" });
  }

  if (description.trim().length < 30 || description.trim().length > 200) {
    return res
      .status(400)
      .json({ message: "Description must be between 30-200 characters" });
  }
  next();
}

module.exports = {
  signUpValidation,
};
