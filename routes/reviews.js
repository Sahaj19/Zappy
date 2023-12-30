const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const WrapAsync = require("../utils/WrapAsync.js");
const { validateReview, isLoggedIn } = require("../utils/middlewares.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review post route)
router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await listing.save();
    await newReview.save();

    req.flash("success", "Your special moment posted successfully!");
    res.redirect(`/listings/${id}`);
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review delete route)
router.delete(
  "/:reviewId",
  isLoggedIn,
  WrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Your special moment deleted successfully!");
    res.redirect(`/listings/${id}`);
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(router)
module.exports = router;
