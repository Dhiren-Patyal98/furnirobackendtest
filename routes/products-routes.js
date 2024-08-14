const express = require('express');

const router = express.Router();

const productscontrollers = require('../controllers/productController');

router.post('/products',productscontrollers.protuctDetails);

router.get('/getproducts',productscontrollers.getProducts);

router.post('/productvariety',productscontrollers.productVarient);

router.get('/getproductvariety',productscontrollers.getProductvariety);

router.delete('/productsdelete/:id', productscontrollers.deleteProduct);

router.delete('/productvarietydelete/:id', productscontrollers.deleteProductVariety);

module.exports = router;