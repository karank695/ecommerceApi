const Product = require('../models/product');
const Counter = require('../models/counter');

//controllers to create product data
module.exports.create = (req, res) => {
    Product.findOne({
        name: req.body.name
    }).then((product) => {
        if (product) {
            return res.status(200).json({
                message: 'product already exist and you can update quantity'
            });
        } else {

            Counter.findOneAndUpdate({
                    id: 'autoval'
                }, {
                    "$inc": {
                        "seq": 1
                    }
                }, {
                    new: true
                })
                .then((data) => {
                    let seqId;
                    if (data == null) {
                        const newVal = new Counter({
                            id: "autoval",
                            seq: 1
                        });
                        console.log(data);
                        newVal.save();
                        seqId = 1;
                    } else {
                        seqId = data.seq;
                    }
                    createProduct(seqId).then((data) => {
                        res.status(200).json({
                            data: {
                                name: req.body.name,
                                quantity: req.body.quantity
                            }
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                })
                .catch((err) => {
                    console.log(err);
                })
            async function createProduct(seqId) {
                return await Product.create({
                    name: req.body.name,
                    quantity: req.body.quantity,
                    id: seqId
                });
            }
        }
    }).catch((err) => {
        console.log(err);
    })
}


//controller to get products 
module.exports.getProducts = (req, res) => {
    Product.find({}, {
        _id: 0,
        __v: 0
    }).then((data) => {
        res.status(200).json({
            data: data
        });
    }).catch((err) => {
        console.log(err);
    })
}


//controllers to delete product
module.exports.delete = (req, res) => {
    Product.findOneAndDelete({
        id: req.params.id
    }).then((data) => {
        Product.find({}).then((data) => {
            if (data.length == 0) {
                Counter.deleteOne({
                    id: 'autoval'
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
        return res.status(200).json({
            data: {
                message: 'product deleted'
            }
        });

    }).catch((err) => {
        console.log(err);
    })
}

//controller to update product
module.exports.update = (req, res) => {
    Product.findOneAndUpdate({ id: req.params.id }, { $set: { quantity: req.query.quantity } }).then((data) => {
        if (data) {
            Product.findOne({ id: req.params.id }, { _id: 0, __v: 0 }).then((data) => {
                res.status(200).json({ data: { product: data, message: 'updated successfully' } });
            }).catch((err) => {
                console.log(err);
            })
        } else {
            res.status(401).json({ message: 'data not found' });
        }
    }).catch((err) => {
        console.log(err);
    })

}