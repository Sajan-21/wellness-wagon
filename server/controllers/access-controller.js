const { error_function } = require("../utils/response-handler").error_function;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const users = require('../db/model/user');
const control_data = require('../utils/control-data.json');

exports.access_controller = async function(access_type, req, res, next) {
    let allowed = access_type.split(',').map((obj) => control_data[obj]);
    // console.log("allowed : ",allowed);
    try {
        // console.log("access_type : ",access_type);
        if(access_type === '*') {
            next();
        }else {
            console.log("req.header : ",req.headers['authorization']);
            let token = req.headers['authorization'].split(' ')[1];
            // console.log("token : ",token);
            if(!token || token === "" || token === "null" || token === "undefined" || token === null || token === undefined){
                let response = error_function({
                    statusCode : 400,
                    message : "invalid token"
                });
                res.status(response.statusCode).send(response);
                return;
            }else{
                jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
                    if(err) {
                        let response = error_function({
                            statusCode : 400,
                            message : err.message ? err.message : "something went wrong"
                        });
                        res.status(response.statusCode).send(response);
                        return;
                    }else{
                        // console.log("decoded : ",decoded);
                        let user_id = decoded.user_id;
                        let user = await users.findOne({_id : user_id});
                        // console.log("user : ",user);
                        if(user.permission == "blocked"){
                            let response = error_function({
                                success : false,
                                statusCode : 400,
                                message : "you are blocked by admin"
                            });
                            res.status(response.statusCode).send(response);
                            return;
                        }

                        // console.log("user : ",user);
                        let user_type = user.user_type;
                        // console.log("user_type : ",user_type);
                        if(allowed && allowed.includes(user_type)){
                            next();
                        }else{
                            let response = error_function({
                                success : false,
                                statusCode : 400,
                                message : "user not allowed in this route"
                            });
                            res.status(response.statusCode).send(response);
                            return;
                        }
                    }
                })
            }
        }
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            statusCode : 400,
            message : error.message ? error.message : "something went wrong",
        });
        res.status(response.statusCode).send(response);
        return;
    }
}