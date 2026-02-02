const userModel = require("../models/userModel") // এখানে একটা ../ কমে যাবে

async function updateUserRole(req, res){
    try{
        const { userId , email, name, role} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true })

        res.json({
            data : updateUser,
            message : "User Role Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = updateUserRole