const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();

// CORS কনফিগারেশন
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// এপিআই রুট কানেক্ট করা (অবশ্যই express.json() এর নিচে হবে)
app.use("/api", router); 

const PORT = process.env.PORT || 8800;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to MongoDB Database");
        console.log("Server is running on " + PORT);
    });
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});