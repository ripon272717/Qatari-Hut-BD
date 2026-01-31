const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs')

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId // মিডলওয়্যার থেকে পাওয়া ইউজার আইডি
        const { email, name, mobile, username, profilePic, password } = req.body

        // ডাটাবেসে আপডেট করার জন্য অবজেক্ট তৈরি
        const payload = {
            ...(name && { name : name }),
            ...(username && { username : username }),
            ...(mobile && { mobile : mobile }),
            ...(profilePic && { profilePic : profilePic }),
        }

        // যদি ইউজার নতুন পাসওয়ার্ড দেয়, তবে সেটি হ্যাশ (Hash) করে সেভ করতে হবে
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt);
            payload.password = hashPassword
        }

        // ডাটাবেস আপডেট কমান্ড
        const updatedUser = await userModel.findByIdAndUpdate(sessionUser, payload, { new: true })

        res.json({
            data: updatedUser,
            message: "প্রোফাইল সফলভাবে আপডেট হয়েছে!",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateUser