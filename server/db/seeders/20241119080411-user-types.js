const user_types = require('../model/user_type');

'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.user_types.insertMany([
        {
          _id : "673c5a279bcc2efcda72d070",
          user_type : "Admin",
        },
        {
          _id : "673c5a3d9bcc2efcda72d071",
          user_type : "Seller",
        },
        {
          _id : "673c5a539bcc2efcda72d072",
          user_type : "Buyer",
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    
    return models.user_types.deleteMany({
      _id: { $in: [
                  "673c5a279bcc2efcda72d070",
                  "673c5a3d9bcc2efcda72d071",
                  "673c5a539bcc2efcda72d072"
                  ]
           }
    }).then(res => {
      // Prints the number of deleted documents
      console.log(res.deletedCount);
    });
    
}
};