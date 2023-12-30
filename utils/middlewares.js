const ExpressError = require("./ExpressError.js");
const { listingSchema, reviewSchema } = require("./joiSchema.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Listing validation function)
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  } else {
    next();
  }
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Review validation function)
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details[0].message;
    return next(new ExpressError(400, errMsg));
  } else {
    next();
  }
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//user authentication function
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must me logged in!");
    return res.redirect("/login");
  }
  next();
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*yaha request send kii thi,
wahi redirect karna hai apne user ko,
login ke baad
*/

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = {
  validateListing,
  validateReview,
  isLoggedIn,
  saveRedirectUrl,
};
