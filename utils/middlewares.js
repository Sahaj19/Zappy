const { listingSchema, reviewSchema } = require("./joiSchema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("./ExpressError.js");

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
/* yeh pehle check karega 
ki owner sahi hai ya nahi
jo bhi listing ya review
ko edit ya delete kar raha 
hai */

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    return next(new ExpressError(400, "you don't have the permission!"));
  }
  next();
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* yeh pehle check karega 
ki owner sahi hai ya nahi
jo bhi reviewko delete kar 
raha hai */

const isReviewAuthor = async (req, res, next) => {
  let { reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!res.locals.currentUser._id.equals(review.author._id)) {
    return next(
      new ExpressError(400, "You cannot delete someone else's special moment!")
    );
  }
  next();
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = {
  validateListing,
  validateReview,
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  isReviewAuthor,
};
