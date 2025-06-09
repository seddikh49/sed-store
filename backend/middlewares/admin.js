import jwt from 'jsonwebtoken'

const authAdmin = async(req, res, next) => {
    try {

        console.log(req.headers.token.split(' ')[1])
    
        const token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.json({ msg: "you don't have authorization to access this api" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded.role)
        if (decoded.role !== 'admin') {
            return res.status(403).json({ msg: "Access denied: Admins only" })
        }
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
    }
}

export default authAdmin