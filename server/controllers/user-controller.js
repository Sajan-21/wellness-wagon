const { error_function, success_function } = require("../utils/response-handler");
const users = require('../db/model/user');

exports.getAllUsers = async function(req, res) {
    try {
        let allUsers = await users.find();
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
            address : body.address,
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