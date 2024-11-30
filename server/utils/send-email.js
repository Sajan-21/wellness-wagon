"use strict";
const { error_function } = require("./response-handler");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async function(emails, subject, content) {
    return new Promise(async(resolve, reject) => {
        try {
            if(typeof emails == "object") emails = emails.join(", ");
            let transporter = nodemailer.createTransport({
                host : process.env.EMAIL_HOST,
                port : process.env.EMAIL_PORT,
                secure : process.env.EMAIL_PORT == 465 ? true : false,
                auth : {
                    user : process.env.EMAIL_USER,
                    pass : process.env.EMAIL_PASSWORD,
                }
            });
            let info = await transporter.sendMail({
                from : '"ppomogard" <support@abcc.ru>',
                to : emails,
                subject : subject,
                html : content,
            });
            resolve(true);
        } catch (error) {
            reject(false);
        }
    });
};