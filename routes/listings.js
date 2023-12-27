const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { listingSchema } = require("../utils/joiSchema.js");
const ExpressError = require("../utils/ExpressError.js");
const WrapAsync = require("../utils/WrapAsync.js");

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
//(index page)
router.get(
  "/",
  WrapAsync(async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new page)
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(post route page)
router.post(
  "/",
  validateListing,
  WrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();

    req.flash("success", "New Toy Added Successfully!");
    res.redirect("/listings");
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show page)
router.get(
  "/:id",
  WrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      return next(new ExpressError(400, "Listing does not exist!"));
    }

    res.render("listings/show.ejs", { listing });
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit page)
router.get(
  "/:id/edit",
  WrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      return next(new ExpressError(400, "Listing does not exist!"));
    }

    res.render("listings/edit.ejs", { listing });
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(update route)
router.put(
  "/:id",
  validateListing,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Toy's info updated successfully!");
    res.redirect(`/listings/${id}`);
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
router.delete(
  "/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Toy's info deleted successfully!");
    res.redirect("/listings");
  })
);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(router)
module.exports = router;
