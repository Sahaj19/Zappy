const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

//++++++++++++++(let's create our toys schema)++++++++++++++++++++
const listingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  quality: {
    type: String,
    required: true,
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

//++++++++++++++++++++++++ listingSchema middleware ++++++++++++++++++++++
//agar koi listing aaya delete hone
//and uski reviews array ke length exist karti hai
//toh reviews array se sare reviews delete hojayege
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

//+++++++++++++++(let's create out Toys model)++++++++++++++++++++++
const Listing = mongoose.model("Listing", listingSchema);

//+++++++++++++++(let's export our Toys model)+++++++++++++++++++++++
module.exports = Listing;
