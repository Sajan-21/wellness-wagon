const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name : {
        type : String
    },
    images : [
        {
            type : String
        }
    ],
    price : {
        type : Number
    },
    category : {
        type : String
    },
    stock_count : {
        type : Number
    },
    seller_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    description : {
        type : String
    },
    review : [
        {
            review : {
                type : String
            },
            writer_id : {
                type : String
            }
        }
    ],
    price_currency : {
        type : String
    },
    brand : {
        type : String
    }
});

module.exports = mongoose.model("products",productScheme);