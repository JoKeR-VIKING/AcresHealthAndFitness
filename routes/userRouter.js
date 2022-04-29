const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/login', userController.login);
router.get('/signup', userController.signup);
router.get('/signout', userController.signout);
router.get('/trainer', userController.trainer);

router.post('/oldUser', userController.oldUser);
router.post('/newUser', userController.newUser);
router.post('/newTrainer', userController.newTrainer);

module.exports = router;