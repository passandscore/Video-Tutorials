//Dependancies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

//Remote files
const coursesRoutes = require("./routes/coursesRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const coursesController = require("./controllers/coursesController");

//express app
const app = express();

//Connect to MongoDB
const dbURI =
  "mongodb+srv://admin:admin@test.qbf7a.mongodb.net/video-tutorials?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000);
    console.log(`Connected to DB & listening on port ${PORT}`);
  })
  .catch((err) => console.error(err.message));

//Register view Engine
app.set("view engine", "ejs");

//Static files
app.use(express.static("public"));

//Middleware
app.use(express.json()); //Applies form data to the req.body
app.use(cookieParser());
app.use(morgan("dev")); //displays error messages in the console with options.

//Routes
app.get("*", checkUser);

app.use("/courses", requireAuth, coursesRoutes);

// app.get("/search", coursesController.courses_search);

app.get("/", (req, res) => {
  res.redirect("/courses");
});

app.use(authRoutes);

app.use("*", (req, res) => {
  res.render("404", { title: "404", modifiedFooter: true });
});
