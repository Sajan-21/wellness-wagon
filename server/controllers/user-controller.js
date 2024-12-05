const { error_function, success_function } = require("../utils/response-handler");
const users = require('../db/model/user');

exports.getAllUsers = async function(req, res) {
    try {
        const user_type = req.params.user_type;
        let filter = {};

        if(user_type == "Buyer"){
            filter = {user_type}
        }else if(user_type == "Seller"){
            filter = {user_type}
        }else if(user_type == "Admin"){
            filter = {user_type : {$ne : user_type}}
        }else{
            filter = {};
        }
        let allUsers = await users.find(filter);
        console.log("allUsers : ",allUsers);
        let response = success_function({
            success : true,
            statusCode : 200,
            data : allUsers,
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : error.message ? error.message : error,
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.getUser = async function(req, res) {
    try {
        let user_id = req.params.user_id;
        let user = await users.findOne({_id : user_id});

        let response = success_function({
            success : true,
            statusCode : 200,
            data : user
        });
        res.status(response.statusCode).send(response);
        return;

    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : error.message ? error.message : error
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.blockUser = async function(req, res) {
    try {
        let id = req.params.user_id;
        await users.updateOne({_id : id}, {$set : {permission : 'blocked'}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "user blocked !!!",
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : error.message ? error.message : error,
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.unBlockUser = async function(req, res) {
    try {
        let id = req.params.user_id;
        await users.updateOne({_id : id}, {$set : {permission : 'unblocked'}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "user unblocked !!!",
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : error.message ? error.message : error,
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.updateUser = async function(req, res) {
    try {
        let body = req.body;
        let id = req.params.auth_id;
        await users.updateOne({_id : id},{$set : {
            name : body.name,
            email : body.email,
            ph_number : body.ph_number,
            house_name : body.house_name !== ("" || "N/A") ? body.house_name : "not specified",
            postal_area : body.postal_area !== ("" || "N/A") ? body.postal_area : "not specified",
            pincode : body.pincode !== ("" || "000000") ? body.pincode : "000000",
            state : body.state !== ("" || "N/A") ? body.state : "not specified",
            company : body.company !== ("" || "N/A") ? body.company : "not specified",
        }});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "your details updated successfully"
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode : 400,
            message : error.messagee ? error.message : error,
        });
        res.status(response.statusCode).send(response);
        return;
    }
}