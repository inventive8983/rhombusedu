const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    _id: mongoose.Types.ObjectId,

    orderId: Number,
    transactionId: String,
    orderedBy: String,

    date: Date,
    totalAmount: Number,
    currency:{
        type: String,
        default: "Rs."
    },
    
    items: [{
        product: String,
        id: String,
        details: Array,
        amount: Number,
        quantity: Number,
    }]
})

module.exports = mongoose.model("Order", orderSchema);