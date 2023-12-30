const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review.js");

let defaultLink =
  "https://images.unsplash.com/photo-1616098063625-65f32186e609?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
    type: String,
    default: defaultLink,
    set: (v) => (v == "" ? defaultLink : v),
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
