const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { 
        type: String, 
        unique: true, 
        sparse: true // ইমেইল না দিলেও যেন ইউনিক এরর না আসে
    },
    mobile: { 
        type: String, 
        unique: true, 
        sparse: true // মোবাইল না দিলেও যেন ইউনিক এরর না আসে
    },
    profilePic: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: "GENERAL" }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;