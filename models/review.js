const mongoose = require("mongoose");
const { Schema } = mongoose;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(special-moment schema)
const reviewSchema = new Schema({
  comment: {
    type: String,
    minlength: [
      50,
      "Your special moment should have a minimum of 50 characters!",
    ],
    required: [true, "Your special moment is required!"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(special-moment model)
const Review = mongoose.model("Review", reviewSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(exporting our special-moment model)
module.exports = Review;
