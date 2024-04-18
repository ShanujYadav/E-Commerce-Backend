import express from 'express';
const router = express.Router()
import account from '../model/account.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';


router.post("/signup", async(req, res) => {
    const { name, email, phone, password, Type } = req.body
    try {
        if (!name || !email || !phone || !password || !Type) {
            res.status(422).json({ code: '422', msg: "All fields must be Filled..." })
        }
        else {
            await account.findOne({ email: email })
                .then((savedUser) => {
                    if (savedUser) {
                        res.status(422).json({ code: '422  ', msg: "User Already Exist" })
                    }
                    else {
                        bcrypt.hash(password, 12)
                            .then(hashedPassword => {
                                const acc = new account({
                                    name,
                                    email,
                                    phone,
                                    password: hashedPassword,
                                    Type
                                })
                                acc.save()
                                    .then(acc => {
                                        res.status(200).json({ code: '200', msg: "User Added Successfully !" })
                                    })
                            })
                    }
                })
        }
    } catch (error) {
        return res.status(500).json({ code: '500', msg: "Internal Server Error" })

    }
})

router.post("/login", async (req, res) => {
    const { email, password, Type } = req.body
    try {
        if (!email || !password || !Type) {
            return res.status(422).json({ code: '422', msg: "All field required..." })
        }
        else {
            await account.findOne({ email: email })
                .then(dbsuer => {
                    if (!dbsuer) {
                        return res.status(422).json({ code: '422', msg: "Invalid email ID" })
                    }
                    else {
                        bcrypt.compare(password, dbsuer.password)
                            .then(domatch => {
                                if (domatch) {
                                    const token = jwt.sign({ id: dbsuer._id }, "backend")
                                    return res.json({ code: '200', token, Type })
                                }
                                else {
                                    return res.status(422).json({ code: '422', msg: "wrong password" })
                                }
                            })
                    }
                })
        }
    } catch (error) {
        return res.status(500).json({ code: '500', msg: "Internal Server Error" })
    }
})
export default router;