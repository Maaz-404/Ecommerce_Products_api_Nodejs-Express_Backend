// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: String,
        required : true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Product model
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}