const JWT = require("jsonwebtoken");
const secrete = process.env.JWT_SECRET;

// Generates a JWT token containing the user's basic identity information.
// The token is later used to authenticate requests.
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = JWT.sign(payload, secrete);

  return token;
}
// Verifies a JWT token and returns the decoded payload.
function validateToken(token) {
  const payload = JWT.verify(token, secrete);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
