const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const WrapAsync = require("../utils/WrapAsync.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//signup get route
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//signup post route
router.post(
  "/signup",
  WrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({ username, email });
      await User.register(newUser, password);
      req.flash("success", `Welcome to Zappy ${username}`);
      res.redirect("/listings");
    } catch (error) {
      req.flash("failure", error.message);
      res.redirect("/signup");
    }
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//login get route
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
