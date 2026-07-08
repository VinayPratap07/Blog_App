const { validateToken } = require("../Service/auth");

// Middleware that checks if a request contains a valid authentication cookie.
// If a valid JWT token exists, the decoded user payload is attached to req.user.
// This middleware does not block requests; it only identifies the logged-in user.
function checkForAuthenticatonCookie(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
    } catch (err) {
      return next();
    }
    next();
  };
}

//Function to enforce login when calling blog routes
function requireAuth(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User not logged in" });
  }

  next();
}

module.exports = {
  checkForAuthenticatonCookie,
  requireAuth,
};
