const express = require('express')

const router = express.Router();

const orderControllers = require('../controllers/orderController');

router.post('/order',orderControllers.orderDetails);

router.get('/getorder',orderControllers.getOrder);

router.get('/getorderitems',orderControllers.getorderItems);

router.post('/orderitems',orderControllers.orderItemsDetails);

router.delete('/deleteorder/:id', orderControllers.deleteOrder);

module.exports = router;