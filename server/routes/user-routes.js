const express = require('express');
const router = express.Router();
const { access_controller } = require('../controllers/access-controller');
const userController = require('../controllers/user-controller');

function setAccessController(access_type) {
    return (req, res, next) => {
        access_controller(access_type, req, res, next);
    }
}

router.get('/users/:user_type',setAccessController("1"),userController.getAllUsers);
router.get('/user/:user_id',setAccessController("1,2,3"),userController.getUser);
router.patch('/block-user/:user_id',setAccessController("1"),userController.blockUser);
router.patch('/unblock-user/:user_id',setAccessController("1"),userController.unBlockUser);
router.patch('/user/:auth_id',setAccessController("2,3"),userController.updateUser);

module.exports = router;