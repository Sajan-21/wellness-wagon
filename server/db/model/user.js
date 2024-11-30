const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  user_type: {
    type : String,
  },
  ph_number: {
    type: Number,
  },
  address: {
    houseName: {
      type: String,
    },
    postalArea: {
      type: String
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number
    },
    landmark: {
      type: String,
    },
  },
  permission: {
    type: String,
  },
  cart_lists: [
    String
  ],
  wish_lists: [
    String
  ],
  products_bought: [
    String
  ],
});

module.exports = mongoose.model("users", userScheme);