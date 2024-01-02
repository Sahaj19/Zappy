const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js");
const listingController = require("../controllers/listings.js");

//handling multipart-form data
const multer = require("multer");
const { storage } = require("../utils/cloudConfig.js");
const upload = multer({ storage });

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
  upload.single("listing[image]"),
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
  upload.single("listing[image]"),
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
