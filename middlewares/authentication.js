const jwt = require('jsonwebtoken');
const User = require('../model/Auth')


const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ msg: "Invalid Authentication, please provide token" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to Job route
        req.user = { id: payload.id, name: payload.name }
        next()
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized: Invalid token" });

    }
}


module.exports = auth