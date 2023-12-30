const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const ExpressError = require("../utils/ExpressError.js");
const { saveRedirectUrl } = require("../utils/middlewares.js");

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
      let registeredUser = await User.register(newUser, password);

      //user will be logged in , after signing up
      req.login(registeredUser, (error) => {
        if (error) {
          return next(new ExpressError(400, error.message));
        }
        req.flash("success", `Welcome to Zappy ${username}`);
        res.redirect("/listings");
      });
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
//login post route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  WrapAsync(async (req, res) => {
    let { username } = req.body;
    req.flash("success", `Welcome back to Zappy ${username}`);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//log out route
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(new ExpressError(500, error.message));
    } else {
      req.flash("success", "Logged you out successfully!");
      res.redirect("/listings");
    }
  });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
