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
  house_name : {
    type : String
  },
  postal_area : {
    type : String
  },
  pincode : {
    type : String
  },
  state : {
    type : String
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
  company : {
    type : String
  },
  products_added : [
    String
  ],
  profit : {
    type : String
  }
});

module.exports = mongoose.model("users", userScheme);