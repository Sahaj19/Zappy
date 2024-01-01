const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const listingController = require("../controllers/listings.js");

//middlewares
const {
  validateListing,
  isLoggedIn,
  isOwner,
} = require("../utils/middlewares.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index page)
router.get("/", WrapAsync(listingController.index));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new page)
router.get("/new", isLoggedIn, listingController.newToyForm);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(post route page)
router.post(
  "/",
  isLoggedIn,
  validateListing,
  WrapAsync(listingController.addingNewToy)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show page)
router.get("/:id", WrapAsync(listingController.toyDetails));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit page)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.editToyForm)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(update route)
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  WrapAsync(listingController.updateToy)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  WrapAsync(listingController.deleteToy)
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(router)
module.exports = router;
