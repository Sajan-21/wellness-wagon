const mongoose = require('mongoose');

const user_typeScheme = new mongoose.Schema({
    user_type : {
        type : String
    }
});

module.exports = mongoose.model("user_types",user_typeScheme);