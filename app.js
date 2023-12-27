const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//routers
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(let's connect our mongodb server)
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Zappy");
}

main()
  .then(() => {
    console.log("Zappy connected successfully");
  })
  .catch((error) => {
    console.log("Zappy failed to connect", error.message);
  });

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Prerequisites)
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//session management
const sessionOptions = {
  secret: "DEVELOPMENT",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 15 * 24 * 60 * 60 * 1000,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//res.local variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  next();
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(home page)
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(routers)
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(wildcard route error handling middleware)
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(specially for id)
app.use((err, req, res, next) => {
  if (err.message.includes("Cast to ObjectId failed")) {
    return next(new ExpressError(400, "Invalid ID!"));
  }
  next(err);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(global error handling middleware)
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("errors/error.ejs", { message });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(port : 3000)
app.listen(3000, () => {
  console.log("server is active on port http://localhost:3000");
});
