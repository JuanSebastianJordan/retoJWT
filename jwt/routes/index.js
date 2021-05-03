var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

router.get('/products', middleware.checkToken, HandlerGenerator.getProducts);

router.post('/post', middleware.checkToken, HandlerGenerator.createProduct);

router.put('/:id', middleware.checkToken, HandlerGenerator.updateProduct);

router.post( '/login', HandlerGenerator.login);

router.post('/register', HandlerGenerator.register);

module.exports = router;