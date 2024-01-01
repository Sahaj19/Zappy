const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middlewares.js");

//usercontroller
const userController = require("../controllers/users.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//signup get route
router.get("/signup", userController.signUpForm);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//signup post route
router.post("/signup", WrapAsync(userController.createUser));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//login get route
router.get("/login", userController.loginForm);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//login post route
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  WrapAsync(userController.verifyUser)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//log out route
router.get("/logout", userController.logOut);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = router;
