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

/** * ছবির ডেটা সাধারণত বড় হয়, তাই লিমিট বাড়িয়ে ৫MB বা ১০MB করতে হবে।
 * এটি না করলে প্রোফাইল পিকচার সেভ হবে না।
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

// এপিআই রুট কানেক্ট করা
app.use("/api", router); 

const PORT = process.env.PORT || 8800;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to MongoDB Database");
        console.log("Server is running on port " + PORT);
    });
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});