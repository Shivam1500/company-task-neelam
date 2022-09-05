const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    UserID: {
        type: String,
    },
    FirstName: {
        type: String,

        required: true,
    },
    LastName: {
        type: String,

        required: true,
    },
    Email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Phone_no: {
        type: Number,
        unique: true,
        required: true,
    },
    Address: {
        type: String,
    },
    Admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
