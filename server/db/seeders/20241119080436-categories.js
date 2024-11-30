const category = require('../model/categories');

'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.category.insertMany([
        {
          _id: "673c52a6ea9342c77762f3bc",
          category: "Cardio Machines"
        },
        {
          _id: "673c52c5ea9342c77762f3bd",
          category: "Strength training"
        },
        {
          _id: "673c52d9ea9342c77762f3be",
          category: "Functional training"
        },
        {
          _id: "673c52f6ea9342c77762f3bf",
          category: "Home Gym equipments"
        },
        {
          _id: "673c530aea9342c77762f3c0",
          category: "Protien powders"
        },
        {
          _id: "673c5326ea9342c77762f3c2",
          category: "Vitamins and Minerals"
        },
        {
          _id: "673c5339ea9342c77762f3c3",
          category: "Pre-workout"
        },
        {
          _id: "673c534eea9342c77762f3c4",
          category: "Post-workout"
        },
        {
          _id: "673c5396ea9342c77762f3c5",
          category: "Recovery tools"
        },
        {
          _id: "673c53a8ea9342c77762f3c6",
          category: "Yoga"
        },
        {
          _id: "673c53b8ea9342c77762f3c7",
          category: "Wellness devices"
        },
        {
          _id: "673c53ccea9342c77762f3c8",
          category: "Accessories"
        },
        {
          _id: "673c53dfea9342c77762f3c9",
          category: "Men's active wears"
        },
        {
          _id: "673c53f0ea9342c77762f3ca",
          category: "Women's active wears"
        },
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    
    return models.category.deleteMany({
      _id: { $in: [
                  "673c52a6ea9342c77762f3bc",
                  "673c52c5ea9342c77762f3bd",
                  "673c52d9ea9342c77762f3be",
                  "673c52f6ea9342c77762f3bf",
                  "673c530aea9342c77762f3c0",
                  "673c5326ea9342c77762f3c2",
                  "673c5339ea9342c77762f3c3",
                  "673c534eea9342c77762f3c4",
                  "673c5396ea9342c77762f3c5",
                  "673c53a8ea9342c77762f3c6",
                  "673c53b8ea9342c77762f3c7",
                  "673c53ccea9342c77762f3c8",
                  "673c53dfea9342c77762f3c9",
                  "673c53f0ea9342c77762f3ca",
                  ]
           }
    }).then(res => {
      // Prints the number of deleted documents
      console.log(res.deletedCount);
    });
    
}
};