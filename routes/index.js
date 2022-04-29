const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');
const planController = require('../controller/planController');

router.get('/', homeController.home);
router.get('/buy', planController.buy);
router.get('/purchase', planController.purchase);
router.get('/training', planController.training);
// router.get('/training', planController.training);
// router.get('/progress', planController.clientProgress);

router.use('/users', require('./userRouter'));

module.exports = router;