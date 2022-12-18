const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {

        const token = req.headers['token']

        if (!token) return res.status(401).json({ message: 'no token , authorization dinied' })
        
        const decoded = jwt.verify(token, 'secret')

        console.log(decoded)

         req.user = decoded.user
        
        next()

    } catch (error) {
        return res.status(500).json({message:"token Invavid!"})
    }
}