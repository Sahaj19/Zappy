const express = require("express");
const router = express.Router({ mergeParams: true });

//review controller
const reviewController = require("../controllers/reviews.js");

//middlewares
const WrapAsync = require("../utils/WrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../utils/middlewares.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review post route)
router.post(
  "/",
  isLoggedIn,
  validateReview,
  WrapAsync(reviewController.createReview)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review edit get route)
router.get(
  "/:reviewId/edit",
  isLoggedIn,
  isReviewAuthor,
  reviewController.editReview
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review update put route)
router.put(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  validateReview,
  WrapAsync(reviewController.updateReview)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(review delete route)
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  WrapAsync(reviewController.deleteReview)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(router)
module.exports = router;
