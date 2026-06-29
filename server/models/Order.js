const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        fullname: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        pincode: {
            type: String,
            required: true
        },

        paymentMethod: {
            type: String,
            enum: ["UPI", "Credit Card", "Debit Card", "Cash on Delivery"],
            required: true
        },

        status: {
            type: String,
            default: "Pending"
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);