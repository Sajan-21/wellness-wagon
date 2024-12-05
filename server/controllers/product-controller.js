const categories = require('../db/model/categories');
const products = require('../db/model/products');
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
        const id = req.params.auth_id;
        const body = req.body;
        console.log("body : ",body);

        body.seller_id = id;

        if(!body.images){
            let response = error_function({
                success : true,
                statusCode : 400,
                message : "you need to add atleast 2 image of your product"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            const directory = "products";
            let b64Images = body.images;
            if(b64Images.length < 4){
                let response = error_function({
                    success : true,
                    statusCode : 400,
                    message : "you need to add 4 images"
                });
                res.status(response.statusCode).send(response);
                return;
            }else{
                let images = await Promise.all(b64Images.map((base64) => fileUpload(base64,directory)));
                body.images = images;
                console.log("body.images : ",body.images);
            }
        }
        let seller = await users.findOne({_id : id});
        seller.company ? body.brand = seller.company : body.brand = "--brand";

        console.log("body ready to add : ",body);
        await products.create(body);

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
        console.log("auth_id : ",id,typeof(id));
        let product_id = req.params.product_id;
        let product = await products.findOne({_id : product_id});
        let seller_id = JSON.stringify(product.seller_id);
        console.log("seller_id : ",seller_id,typeof(seller_id));
        console.log( seller_id, '"' + id + '"');
        if( seller_id  !== '"' + id + '"'){
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
        } else if(user_type === "null" && category !== "null") {
            filter = {category};
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
}

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

exports.getCartProducts = async function (req, res) {
    try {
        const id = req.params.user_id;
        const user = await users.findOne({ _id: id });

        if (!user || !user.cart_lists) {
            throw new Error("User or cart list not found");
        }
        const cartLists = user.cart_lists;

        const cartProducts = await Promise.all(
            cartLists.map(async (_id) => {
                console.log("_id:", _id);
                const product = await products.findOne({ _id });
                console.log("Product:", product);
                return product;
            })
        );

        const response = success_function({
            success: true,
            statusCode: 200,
            data: cartProducts,
        });
        console.log("Cart Products:", cartProducts);
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        const response = error_function({
            success: false,
            statusCode: 400,
            message: error.message || error,
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

exports.getWishListProducts = async function (req, res) {
    try {
        const id = req.params.user_id;
        const user = await users.findOne({ _id: id });

        if (!user || !user.wish_lists) {
            throw new Error("User or wish list not found");
        }
        const wishLists = user.wish_lists;

        const wishListProducts = await Promise.all(
            wishLists.map(async (_id) => {
                console.log("_id:", _id);
                const product = await products.findOne({ _id });
                console.log("Product:", product);
                return product;
            })
        );

        const response = success_function({
            success: true,
            statusCode: 200,
            data: wishListProducts,
        });

        console.log("Wish List Products:", wishListProducts);
        res.status(response.statusCode).send(response);
        return;
    } catch (error) {
        const response = error_function({
            success: false,
            statusCode: 400,
            message: error.message || error,
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

        if(!buyer.pincode || buyer.pincode == "" || buyer.pincode == "not specified" || buyer.pincode == undefined || buyer.pincode == null || buyer.pincode == "N/A" || !buyer.house_name || buyer.house_name == "" || buyer.house_name == "not specified" || buyer.house_name == undefined || buyer.house_name == null || buyer.house_name == "N/A" || !buyer.postal_area || buyer.postal_area == "" || buyer.postal_area == "not specified" || buyer.postal_area == undefined || buyer.postal_area == null || buyer.postal_area == "N/A" || !buyer.state || buyer.state == "" || buyer.state == "not specified" || buyer.state == undefined || buyer.state == null || buyer.state == "N/A" ){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "something is missing in your address, please try again",
            });
            res.status(response.statusCode).send(response);
            return;
        }

        if(product.stock_count === 0){
            let response = error_function({
                success : false,
                statusCode : 400,
                message : "you can't buy this product, this product is out of stock"
            });
            res.status(response.statusCode).send(response);
            return;
        }else{
            // let order_email_template_seller = await orderMailSeller_template(buyer,product);
            //await sendEmail(seller.email, "new order", order_email_template_seller);

            // let order_email_template_admin = await orderMailAdmin_template(buyer, seller, product);
            // await sendEmail(buyer.email, "new order", order_email_template_admin);

            if(product.stock_count === 1){

                // let out_of_stock_template = await outOfStockMail_template(seller, product);
                // await sendEmail(seller.email, "out of stock", out_of_stock_template);
            };

            // let order_email_template_buyer = await orderMailBuyer_template(buyer, product);
            // await sendEmail(buyer.email, "order placed", order_email_template_buyer);

            let stock_count = product.stock_count - 1;
            await products.updateOne({product_id}, {$set : {stock_count : stock_count}});
            await users.updateOne({_id : buyer_id}, {$push: {products_bought : product_id}});
            let profit = Number(seller.profit) + product.price;
            await users.updateOne({_id : seller_id},{$set : {profit}});
        }

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

exports.seller_products = async function(req, res){
    try {
        let id = req.params.seller_id;
        let seller_products = await products.find({seller_id : id});
        let response =  success_function({
            success : true,
            statusCode : 200,
            data : seller_products
        });
        res.status(response.statusCode).send(response);
        console.log("data : ",seller_products);
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