const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index logic)
const index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new page form)
const newToyForm = (req, res) => {
  res.render("listings/new.ejs");
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(post route page)
const addingNewToy = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();

  req.flash("success", "New Toy Added Successfully!");
  res.redirect("/listings");
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(toy show page)
const toyDetails = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    return next(new ExpressError(400, "Listing does not exist!"));
  }

  res.render("listings/show.ejs", { listing });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit page form)
const editToyForm = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    return next(new ExpressError(400, "Listing does not exist!"));
  }

  res.render("listings/edit.ejs", { listing });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(update toy route)
const updateToy = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Toy's info updated succcessfully!");
  res.redirect(`/listings/${id}`);
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete toy route)
const deleteToy = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Toy's info deleted successfully!");
  res.redirect("/listings");
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = {
  index,
  newToyForm,
  addingNewToy,
  toyDetails,
  editToyForm,
  updateToy,
  deleteToy,
};
