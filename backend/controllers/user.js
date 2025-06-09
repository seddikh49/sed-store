
import jwt from 'jsonwebtoken'

const admin = (req, res) => {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email, role: "admin" },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        )
        res.json({ token: token })
    } else {
        res.json({ msg: 'sorry ,access denied ' })
    }
}

export default admin