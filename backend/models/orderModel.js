const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productDetails: [{
        productId: { type: String, ref: 'product' },
        quantity: Number,
        price: Number
    }],
    shippingDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        address: { type: String, required: true }
    },
    paymentDetails: {
        paymentId: String,
        payment_status: { type: String, default: "Pending" },
        totalAmount: Number
    },
    userId: { type: String, default: "" }, // গেস্ট হলে এটা খালি থাকবে
    isGuest: { type: Boolean, default: true }
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;