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
    req.flash("error", "You must be logged in!");
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
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      return next(new ExpressError(400, "Listing does not exist"));
    }

    if (!listing.owner) {
      return next(new ExpressError(400, "Listing owner does not exist!"));
    }

    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
      return next(new ExpressError(400, "you don't have the permission!"));
    }
    next();
  } catch (error) {
    next(new ExpressError(500, error));
  }
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* yeh pehle check karega 
ki owner sahi hai ya nahi
jo bhi reviewko delete kar 
raha hai */

const isReviewAuthor = async (req, res, next) => {
  try {
    let { reviewId } = req.params;
    let review = await Review.findById(reviewId).populate("author");

    if (!review) {
      return next(new ExpressError(400, "Review does not exist!"));
    }

    if (!review.author) {
      return next(new ExpressError(400, "Review author not found!"));
    }

    if (!res.locals.currentUser._id.equals(review.author._id)) {
      return next(
        new ExpressError(
          400,
          "You cannot delete someone else's special moment!"
        )
      );
    }

    next();
  } catch (error) {
    next(new ExpressError(500, error));
  }
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
