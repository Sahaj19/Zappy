const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

//+++++++++++++++++++++++++++ user schema +++++++++++++++++++++++++++++++++
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

//+++++++++++++++++++++++++++ passport plugin ++++++++++++++++++++++++++++++
userSchema.plugin(passportLocalMongoose);

//+++++++++++++++++++++++++++ user model +++++++++++++++++++++++++++++++++++
const User = mongoose.model("User", userSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = User;

/* NOTE : passport local mongoose khud
se hi username and password
add kardega , salting and hashing
ke saath. */
