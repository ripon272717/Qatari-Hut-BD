const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// CORS কনফিগারেশন - ভার্সেল এবং লোকালহোস্ট দুইটাই এলাউড
app.use(cors({
    origin: ["http://localhost:3000", "https://qatari-hut-bd.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(cookieParser());

// এপিআই রাউটস
app.use("/api", router);

const PORT = process.env.PORT || 8800;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
}).catch(err => console.log(err));