const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{ type:String, require:true },
        description: { type:String, require:false},
        images: [{type:String, require:false}],
        price: {type:Number, require:true, default: 0},
        stock: {type:Number, require: true, default: 0},
        date: {type:Date, default: Date(), require: true},
        category: {type:String, require:true},
        variations: [{type: String, require: false}]
    }
)
const Product = mongoose.model('products', productSchema);

module.exports = Product;