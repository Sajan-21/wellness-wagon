const users = require('../model/user');

("use strict");

module.exports = {
  up: (models, mongoose) => {
    return models.users
      .insertMany([
        {
          _id: "673c4f64ea9342c77762f3ba",
          name: "John",
          email: "john@gmail.com",
          password: "$2a$10$tdxH/dQX.g0xa1EAkl6ltuvTl2WIGKrUtVn5wNKOWwi3LZIvMUkE2",
          user_type: "Admin",
        },
      ])
      .then((res) => {
        // Prints "1"
        console.log(res.insertedCount);
      });
  },

  down: (models, mongoose) => {
    return models.users
      .deleteMany({
        _id: { $in: [
          "673c4f64ea9342c77762f3ba"
        ] },
      })
      .then((res) => {
        // Prints the number of deleted documents
        console.log(res.deletedCount);
      });
  },
};
