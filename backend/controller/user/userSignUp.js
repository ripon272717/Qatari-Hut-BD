const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, mobile, password, confirmPassword, name, username, profilePic } = req.body

        // ১. ইমেইল অথবা মোবাইল যেকোনো একটি থাকা বাধ্যতামূলক
        if (!email && !mobile) {
            throw new Error("দয়া করে ইমেইল অথবা মোবাইল নম্বর দিন")
        }

        // ২. পাসওয়ার্ড চেক
        if (password !== confirmPassword) {
            throw new Error("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মেলেনি")
        }

        // ৩. ইউজার আগে থেকে আছে কি না চেক (Email, Mobile, Username তিনভাবেই)
        const userExists = await userModel.findOne({
            $or: [
                { email: email || "null" },
                { mobile: mobile || "null" },
                { username: username }
            ]
        })

        if (userExists) {
            throw new Error("এই ইউজারনেম, ইমেইল বা মোবাইল দিয়ে ইতিপূর্বে অ্যাকাউন্ট খোলা হয়েছে")
        }

        // ৪. পাসওয়ার্ড হ্যাশ করা
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "অ্যাকাউন্ট তৈরি সফল হয়েছে!"
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController