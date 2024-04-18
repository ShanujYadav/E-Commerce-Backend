import jwt from "jsonwebtoken"
import account from "../model/account.js"

const requireLogin = async (req, res, next) => {
    const { authorization } = req.headers

    try {
        if (!authorization) {
            return res.status(401).json({ code: '401', message: "You must be logged in" })
        }
        else {
            const token = authorization.replace("Bearer ", "")
            jwt.verify(token, "backend", async (err, payload) => {
                if (err) {
                    return res.status(401).json({ code: '401', message: "You must be logged in" })
                }
                else {
                    const { id } = payload
                    await account.findById(id)
                        .then(account => {
                            account.password = undefined
                            req.account = account
                            next();
                        })
                }
            })
        }
    } catch (error) {
        return res.status(500).json({ code: '500', message: "Internal Server Error" })
    }
}
export default requireLogin;