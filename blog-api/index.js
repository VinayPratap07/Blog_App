const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Imports
const {
  checkForAuthenticatonCookie,
  requireAuth,
} = require("./Middlewares/authenticaton_middleware");

//Routes
const blogRoute = require("./Routes/blogRoutes");
const userRoute = require("./Routes/userRoutes");
const commentRoute = require("./Routes/commentRoutes");
const { connectMongoDB } = require("./connect");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

//connecting database
connectMongoDB(process.env.MONGODB_URL).then(() =>
  console.log("Database Connected"),
);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticatonCookie("token"));
app.use(cors(corsOptions));

//Routes
app.use("/api/blog", requireAuth, blogRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));
