const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(toys-schema)

const listingSchema = new Schema({
  name: {
    type: String,
    minlength: [3, "Toy's name should have minimum of 3 characters!"],
    maxlength: [25, "Toy's name should not be more than 25 characters!"],
    trim: true,
    unique: true,
    required: [true, "Please enter your toy's name!"],
  },
  description: {
    type: String,
    minlength: [
      50,
      "Toy's description should have a minimum of 50 characters!",
    ],
    required: [true, "Please enter your toy's description!"],
  },
  image: {
    url: String,
    filename: String,
  },
  quality: {
    type: String,
    minlength: [50, "Toy's quality should have a minimum of 50 characters!"],
    required: [true, "Please enter your toy's quality!"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(listing schema post middleware)

//agar koi listing aaya delete hone
//and uski reviews array ke length exist karti hai
//toh reviews array se sare reviews delete hojayege
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(listing model)
const Listing = mongoose.model("Listing", listingSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(exporting our listing model)
module.exports = Listing;
