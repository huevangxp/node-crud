const userModel = require('../Models/userMoel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => { 
    try {

        if (!req.body.username && !req.body.phone && !req.body.password) {
            return res.status(400).json({message:'user is empty'})
        }

        const phone = await userModel.findOne({ phone: req.body.phone })
        
        if (phone) {
            return res.status(200).json('phone exists')
        }

        const hashPass = await bcrypt.hash(req.body.password, 10)

        const newRegister = {
            ...req.body,
            password: hashPass,
        }

        const User = await userModel.create(newRegister)
        return res.status(201).json(User)
        
    } catch (error) {
       return res.status(500).json({message:error.message})
    }
}

const login = async (req, res) => {
    try {
        if (!req.body.username && !req.body.password) {
            return res.status(400).json({ message: 'the body is not empty' })
        }
        const user = await userModel.findOneAndUpdate({ username: req.body.username })
        if (!user) return res.status(404).json({ message: 'user name is not found' })
        

        const validatePass = await bcrypt.compare(req.body.password, user.password)

        if (!validatePass) return res.status(404).json({ message: 'password not match' })

        const asign = await jwt.sign({
            id: user._id,
            role: user.role
        }, 'secret',{expiresIn : '24h'})

        const User = {
            username: user.username,
            password: user.password,
            token:asign
        }


        return res.status(200).json(User)

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    register,
    login
}