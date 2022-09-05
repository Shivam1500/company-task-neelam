const mongoose = require("mongoose");

const bankSchema = mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    Bank_Name: {
        type: String,
        trim: true,
        required: true,
    },
    Branch: {
        type: String,
        trim: true,
        required: true,
    },
    IFSC_Code: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    Account_No: {
        type: String,
    }

}, { timestamps: true });

const Bank = mongoose.model("bank", bankSchema);

module.exports = Bank;
