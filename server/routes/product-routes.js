const express = require('express');
const router = express.Router();
const { access_controller } = require('../controllers/access-controller');
const productController = require('../controllers/product-controller');

function setAccessController(access_type) {
    return (req, res, next) => {
        access_controller(access_type, req, res, next);
    }
}

router.post('/product/:auth_id',setAccessController('2'),productController.addProduct);
router.patch('/product/:auth_id/:product_id',setAccessController('2'),productController.updateProduct);
router.delete('/product/:auth_id/:product_id',setAccessController('2'),productController.deleteProduct);
router.get('/product/:product_id',productController.getProduct);
router.get('/products/:auth_id/:category/:user_type',productController.getProducts);
router.patch('/cart/:auth_id/:product_id',setAccessController("2,3"),productController.cart);
router.patch('/remove-from-cart/:auth_id/:product_id',setAccessController("2,3"),productController.removeFromCart);
router.get('/cart/:user_id',setAccessController("*"),productController.getCartProducts);
router.patch('/wish-list/:auth_id/:product_id',setAccessController("2,3"),productController.wish_lists);
router.patch('/remove-from-wish-lists/:auth_id/:product_id',setAccessController("2,3"),productController.removeFromWish_lists);
router.get('/wish-list/:user_id',setAccessController("*"),productController.getWishListProducts);
router.patch('/order-products/:auth_id',setAccessController("2,3"),productController.buyProducts);
router.get('/categories',setAccessController('*'),productController.categories);
router.get('/seller-products/:seller_id',setAccessController("1,2"),productController.seller_products);
router.get('/products-bought/:user_id',setAccessController('*'),productController.getProuctsBought);

module.exports = router;