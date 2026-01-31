const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { identifier, password } = req.body // identifier = Email or Mobile or Username

        if (!identifier) {
            throw new Error("দয়া করে ইমেইল, মোবাইল অথবা ইউজারনেম দিন")
        }
        if (!password) {
            throw new Error("দয়া করে পাসওয়ার্ড দিন")
        }

        // লজিক: তিনটির যেকোনো একটির সাথে মিললে ইউজারকে খুঁজে আনবে
        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { mobile: identifier },
                { username: identifier }
            ]
        })

        if (!user) {
            throw new Error("ইউজার পাওয়া যায়নি")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'None' // যদি কুকি নিয়ে সমস্যা হয় তবে এটি কাজে দেবে
            }

            res.cookie("token", token, tokenOption).status(200).json({
                message: "লগইন সফল হয়েছে",
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new Error("ভুল পাসওয়ার্ড, দয়া করে আবার চেষ্টা করুন")
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignInController