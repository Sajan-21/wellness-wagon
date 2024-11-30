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
router.get('/product/:product_id',setAccessController('*'),productController.getProduct);
router.get('/products/:auth_id/:category/:user_type',productController.getProducts);
router.patch('/cart/:auth_id/:product_id',setAccessController("2,3"),productController.cart);
router.patch('/wish_lists/:auth_id/:product_id',setAccessController("2,3"),productController.wish_lists);
router.patch('/removeFromCart/:auth_id/:product_id',setAccessController("2,3"),productController.removeFromCart);
router.patch('/removeFromWish_lists/:auth_id/:product_id',setAccessController("2,3"),productController.removeFromWish_lists);
router.patch('/orderProduct/:auth_id/:product_id',setAccessController("2,3"),productController.buyProduct);
router.get('/categories',setAccessController('*'),productController.categories);

module.exports = router;