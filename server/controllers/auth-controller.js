const { error_function, success_function } = require('../utils/response-handler');
const user_types = require('../db/model/user_type');
const users = require('../db/model/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');

exports.signUp = async function(req, res) {
    try {
        console.log(req.headers);
        let body = req.body;
        console.log("body : ",body);
        let email = body.email;
        console.log("email : ",email);
        if(!email) {
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "please enter email"
            });
            res.status(response.statusCode).send(response);
            return;
        }
        let checkExistancyOfEmail = await users.findOne({email});
        if(checkExistancyOfEmail){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "this email already exists. please login to continue"
            });
            res.status(response.statusCode).send(response);
            return;
        }
        let password = body.password;
        if(!password){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "please enter password"
            });
            res.status(response.statusCode).send(response);
            return;
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        body.password = hash;

        let user_type = body.user_type;
        if(user_type === 'user_type'){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "please select a user_type"
            });
            res.status(response.statusCode).send(response);
            return;
        }
        else if(user_type === 'Seller'){
            let user_type_collection = await user_types.findOne({user_type});
            let userType_userType = user_type_collection.user_type;
            body.user_type = userType_userType;
            body.profit = 0;
        }else{
            let user_type_collection = await user_types.findOne({user_type});
            let userType_userType = user_type_collection.user_type;
            body.user_type = userType_userType;
        }
        let ph_number = body.ph_number;
        if(!ph_number){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "please enter your phone number"
            });
            res.status(response.statusCode).send(response);
            return;
        }
        body.permission = 'unblocked';
        let name;
        body.name ? name = body.name : name="guest";
        body.name = name;
        console.log("body : ",body);

        await users.create(body);
        let user = await users.findOne({email});
        let token = jwt.sign({user_id : user._id}, process.env.PRIVATE_KEY, {expiresIn : "10d"});
        
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "successfully created account",
            data : {
                token,
                user_type,
                id : user._id
            }
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

exports.login = async function(req, res) {
    try {
        let body = req.body;
        let email = body.email;
        let password = body.password;
        if(!email) {
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "please enter email"
            });
            res.status(response.statusCode).send(response);
            return;
        }
        let user = await users.findOne({email}).populate('user_type');
        console.log(user);
        if(!user){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "user not found"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            let user_type = user.user_type;
            let checkPassword = bcrypt.compareSync(password, user.password);
            if(!checkPassword){
                let response = error_function({
                    success : false,
                    statusCode : 400,
                    message : "incorrect password, please try again"
                });
                res.status(response.statusCode).send(response);
                return;
            }else{
                if(user.permission == "blocked"){
                    let response = error_function({
                        success : false,
                        statusCode : 400,
                        message : "you are blocked by admin"
                    });
                    res.status(response.statusCode).send(response);
                    return;
                }else{
                    let token = jwt.sign({user_id : user._id},process.env.PRIVATE_KEY, {expiresIn : "10d"});
                
                    let response = success_function({
                        success : true,
                        statusCode : 200,
                        message : "login successfully",
                        data : {
                            token,
                            user_type,
                            id : user._id
                        }
                    });
                    res.status(response.statusCode).send(response);
                    return;
                }
            }
        }
    } catch (error) {
        console.log("error : ",error);
    }
}