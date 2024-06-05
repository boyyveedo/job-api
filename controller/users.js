const User = require("../model/Auth")
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })
        if (!userFound) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isPasswordMatched = await bcrypt.compare(password, userFound.password)
        if (!userFound && !isPasswordMatched) {
            return res.status(401).json({
                msg: "invalid credentials, please try again"
            })
        }
        res.json({
            status: "Sucessful",
            data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id)
            }
        })
    } catch (error) {
        console.log(error)
    }
}



const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        const userFound = await User.findOne({ email })
        if (userFound) {
            return res.json({
                msg: "user already exist"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const users = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })
        res.json({
            status: "Success",
            data: "User registered",
        })

    } catch (error) {
        res.json(error.message)
    }
}






module.exports = {
    login,
    register
}