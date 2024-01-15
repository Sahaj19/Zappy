const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review post route)
const createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await listing.save();
  await newReview.save();

  req.flash("success", "Your special moment posted successfully!");
  res.redirect(`/listings/${id}`);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review edit route)
const editReview = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    return next(new ExpressError(400, "Listing does not exist!"));
  }

  let review = await Review.findById(reviewId).populate("author");

  if (!review || !review.author) {
    return next(new ExpressError(400, "Review does not exist!"));
  }

  res.render("reviews/edit.ejs", { listing, review });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review update route)
const updateReview = async (req, res, next) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
  req.flash("success", "Your moment updated successfully!");
  res.redirect(`/listings/${id}`);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review delete route)
const deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Your special moment deleted successfully!");
  res.redirect(`/listings/${id}`);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = { createReview, deleteReview, editReview, updateReview };
