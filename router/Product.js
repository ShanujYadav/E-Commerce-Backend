import express from "express"
const productRouter = express.Router()
import addProduct from "../model/addProduct.js"
import requireLogin from "../middleware/requireLogin.js"


productRouter.post("/addProduct", requireLogin, async (req, res) => {
    const { Pname, Pcategory, Pprice, Punit, Ppic, sellerName } = req.body
    try {
        if (!Pname || !Pcategory || !Pprice || !Punit || !Ppic || !sellerName) {
            res.status(422).json({ code: "422", msg: "All field must be filled" })
        }
        else {
            const product = await new addProduct({ Pname, Pcategory, Pprice, Punit, Ppic, sellerName })
            product.save()
                .then(result => {
                    res.json(result)
                })
        }
    } catch (error) {
        res.status(500).json({ code: '500', msg: "Internal Server Error" })
    }
})


productRouter.get("/allProduct", async (req, res) => {
    try {
        await addProduct.find()
            .then(posts => res.json(posts))
    } catch (error) {
        res.status(500).json({ code: '500', msg: "Internal Server Error" })
    }
})


productRouter.get("/myProduct/:Pcategory", async (req, res) => {
    const category = req.params.Pcategory
    try {
        await addProduct.find({ Pcategory: category })
            .then(product => {
                res.json(product)
            })
    } catch (error) {
        res.status(500).json({ code: '500', msg: "Internal Server Error" })
    }
})

export default productRouter