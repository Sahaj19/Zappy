const mongoose = require("mongoose");
const { Schema } = mongoose;

//++++++++++++++++++++++ review Schema +++++++++++++++++++++++++++
const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//+++++++++++++++++++++++++ review model ++++++++++++++++++++++++++++
const Review = mongoose.model("Review", reviewSchema);

//++++++++++++++++++++++ let's export our review model ++++++++++++++++++++\
module.exports = Review;
