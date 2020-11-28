// productController.js
// Import product model
Product = require('./productModel');
// Handle index actions
exports.index = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "products retrieved successfully",
            data: products
        });
    });
};
// Handle create product actions
exports.new = function (req, res) {
    var product = new Product();
    product.name = req.body.name ? req.body.name : product.name;
    product.stock = req.body.stock;
    product.price = req.body.price;
    product.description = req.body.description;
// save the product and check for errors
    product.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New product created!',
                data: product
            });
    });
};
// Handle view product info
exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'product details loading..',
            data: product
        });
    });
};
// Handle update product info
exports.update = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        product.name = req.body.name ? req.body.name : product.name;
        product.stock = req.body.stock;
        product.price = req.body.price;
        product.description = req.body.description;
// save the product and check for errors
        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'product Info updated',
                data: product
            });
        });
    });
};
// Handle pelete product
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'product deleted'
        });
    });
};