const categories = require('../db/model/categories');
const products = require('../db/model/product');
const { success_function, error_function } = require('../utils/response-handler');
const fileUpload = require('../utils/file-uploads').fileUpload;
const sendEmail = require('../utils/send-email').sendEmail;
const orderMailAdmin_template = require('../utils/email-templates/order-template-admin').orderMailAdmin;
const orderMailSeller_template = require('../utils/email-templates/order-template-seller').orderMailSeller;
const outOfStockMail_template = require('../utils/email-templates/outofStock-template').outOfStock;
const orderMailBuyer_template = require('../utils/email-templates/order-template-buyer').orderMailBuyer;
const users = require('../db/model/user');

exports.addProduct = async function(req, res) {
    try {
        const id = req.params.auth_id; // Seller ID
        const body = req.body;
        console.log("body : ",body);
        let category = body.category;

        // Find category by name
        const category_collection = await categories.findOne({ category });
        if (!category_collection) {
            throw new Error("Category not found");
        }
        category = category_collection.category;

        // Replace category name with ID
        body.category = category;

        // Assign seller ID
        body.seller_id = id;

        // Process images in Base64
        if(!body.images){
            let response = error_function({
                success : true,
                statusCode : 400,
                message : "you need to add atleast 1 image of your product"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            const directory = "products";
            let b64Images = body.images;
            let images = await Promise.all(b64Images.map((base64) => fileUpload(base64,directory)));
            body.images = images;
            console.log("body.images : ",body.images);
        }

        console.log("body ready to add : ",body);
        // Create the product
        await products.create(body);

        // Success response
        const response = success_function({
            success: true,
            statusCode: 200,
            message: "Product added successfully",
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.error("error: ", error);
        const response = error_function({
            success: false,
            statusCode: 400,
            message: error.message ? error.message : error,
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.updateProduct = async function(req, res) {
    try {
        let body = req.body;
        let _id = req.params.product_id;
        await users.updateOne({_id },{$set : {stock_count : body.stock_count, description : body.description, price : body.price, name : body.name}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "data updated successfully"
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error: ", error);
        const response = error_function({
            success: false,
            statusCode: 400,
            message: error.message ? error.message : error,
        });
        res.status(response.statusCode).send(response);
        return;
    }
}

exports.deleteProduct = async function(req, res) {
    try {
        let id = req.params.auth_id;
        let product_id = req.params.product_id;
        let product = await products.findOne({_id : product_id});
        if(product.seller_id !== id){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "you cannot delete this product, because this is not your product"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            await products.deleteOne({_id : product_id});
            let response = success_function({
                success : true,
                statusCode : 200,
                message : "product deleted successfully"
            });
            res.status(response.statusCode).send(response);
            return;
        }
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

exports.getProduct = async function(req, res) {
    try {
        let product_id = req.params.product_id;
        let product = await products.findOne({_id : product_id});
        let response = success_function({
            success : true,
            statusCode : 200,
            data : product
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

// exports.getProducts = async function(req, res) {
//     try {
//         const { category, user_type, auth_id } = req.params;
//         let filter = {};
//         if (user_type === "Seller") {
//             if (!category || category === "null") {
//                 filter.seller_id = {$ne : auth_id};
//             } else {
//                 filter = { category, seller_id: { $ne: auth_id } };
//             }
//         } else if (user_type === "Buyer") {
//             if (category && category !== "null") {
//                 filter.category = category;
//             }
//         }
//         console.log(filter);
//         const productsList = await products.find(filter);
//         let response = success_function({
//             success : true,
//             statusCode : 200,
//             data : productsList
//         });
//         res.status(response.statusCode).send(response);
//         return;
//     } catch (error) {
//         console.log("error : ",error);
//         let response = error_function({
//             success : false,
//             statusCode : 400,
//             message : error.message ? error.message : error
//         });
//         res.status(response.statusCode).send(response);
//         return;
//     }
// }

exports.getProducts = async function (req, res) {
    try {
        const { auth_id, user_type, category } = req.params;
        console.log(auth_id,user_type,category);
        let filter={};

        if (user_type == "Seller") {
            if (!category || category == "null") {
                // Condition 1: Seller, no category
                filter = { seller_id: { $ne: auth_id } };
                console.log("filter",filter);
            } else {
                // Condition 2: Seller with a specific category
                filter = { category, seller_id: { $ne: auth_id } };
            }
        } else if (user_type === "Buyer") {
            if (category && category !== "null") {
                // Condition 3a: Buyer with a specific category
                filter = { category };
            } else {
                // Condition 3b: Buyer with no category (fetch all products)
                filter = {};
            }
        } else if (
            (!user_type || user_type === "Admin") && (!category || category === "null") && !auth_id){
            // Condition 4: Admin or all parameters null (fetch all products)
            filter = {};
        }

        console.log("Generated Filter:", filter);

        const productsList = await products.find(filter);

        const response = success_function({
            success: true,
            statusCode: 200,
            data: productsList,
        });

        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.error("Error:", error);

        const response = error_function({
            success: false,
            statusCode: 400,
            message: error.message || error,
        });

        res.status(response.statusCode).send(response);
        return;
    }
};



exports.cart = async function(req, res) {
    try {
        let product_id = req.params.product_id;
        let id = req.params.auth_id;
        await users.updateOne({_id : id},{$push : {cart_lists : product_id}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "product added to cart",
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

exports.removeFromCart = async function(req, res) {
    try {
        let product_id = req.params.product_id;
        let id = req.params.auth_id;
        await users.updateOne({_id : id},{$pull : {cart_lists : product_id}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "product removed from cart",
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

exports.wish_lists = async function(req, res) {
    try {
        let product_id = req.params.product_id;
        let id = req.params.auth_id;
        await users.updateOne({_id : id},{$push : {wish_lists : product_id}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "product added to wish list",
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

exports.removeFromWish_lists = async function(req, res) {
    try {
        let product_id = req.params.product_id;
        let id = req.params.auth_id;
        await users.updateOne({_id : id},{$pull : {wish_lists : product_id}});
        let response = success_function({
            success : true,
            statusCode : 200,
            message : "product removed from wish list",
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

exports.buyProduct = async function(req, res) {
    try {
        let buyer_id = req.params.auth_id;
        let product_id = req.params.product_id;
        let product = await products.findOne({_id : product_id});
        let seller_id = product.seller_id;
        let seller = await users.findOne({_id : seller_id});
        let buyer = await users.findOne({_id : buyer_id});

        if(product.stock_count === 0){
            let response = success_function({
                success : false,
                statusCode : 400,
                message : "you can't buy this product, this product is out of stock"
            });
            res.status(response.statusCode).send(response);
            return;
        }

        // let order_email_template_seller = await orderMailSeller_template(buyer,product);
//         await sendEmail(seller.email, "new order", order_email_template_seller);

        // let order_email_template_admin = await orderMailAdmin_template(buyer, seller, product);
        // await sendEmail(buyer.email, "new order", order_email_template_admin);

        if(product.stock_count === 1){
            await products.updateOne({product_id},{$set : {stock_count : stock_count-1}});

            // let out_of_stock_template = await outOfStockMail_template(seller, product);
            // await sendEmail(seller.email, "out of stock", out_of_stock_template);
        };

        // let order_email_template_buyer = await orderMailBuyer_template(buyer, product);
        // await sendEmail(buyer.email, "order placed", order_email_template_buyer);

        let response = success_function({
            success : true,
            statusCode : 200,
            message : "order placed successfully",
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

exports.categories = async function(req, res) {
    try {
        let category_collections = await categories.find().populate('category');
        let response = success_function({
            success : true,
            statusCode : 200,
            data : category_collections
        });
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        console.log("error : ",error);
        let response = error_function({
            success : false,
            statusCode  : 400,
            message : error.message ? error.message : error
        });
        res.status(response.statusCode).send(response);
        return;
    }
}