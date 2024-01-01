const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//signup form
const signUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//signup post route
const createUser = async (req, res) => {
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
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//login form
const loginForm = (req, res) => {
  res.render("users/login.ejs");
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//login post route (verifying user)
const verifyUser = async (req, res) => {
  let { username } = req.body;
  req.flash("success", `Welcome back to Zappy ${username}`);
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//logout route
const logOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(new ExpressError(500, error.message));
    } else {
      req.flash("success", "Logged you out successfully!");
      res.redirect("/listings");
    }
  });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = { signUpForm, createUser, loginForm, verifyUser, logOut };
