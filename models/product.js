const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product