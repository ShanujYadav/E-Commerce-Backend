import express from "express"
import requireLogin from "../middleware/requireLogin.js"
const cartRouter = express.Router()
import addProduct from "../model/addProduct.js"
import cart from '../model/cart.js'


cartRouter.post("/addToCart/:Piid", requireLogin, (req, res) => {
  const Piid = req.params.Piid
  addToCart(Piid)
  async function addToCart(Piid) {
    const Product = await addProduct.findById(Piid)
    if (Product.Punit > 0) {
      findIncart(Product.id)
      async function findIncart(id) {
        const prod = await cart.find({ Pid: id })
        if (prod.length === 0) {
          const data = new cart({ Pid: Product._id, Pname: Product.Pname, Pcategory: Product.Pcategory, Pprice: Product.Pprice, Pquantity: 1, Ppic: Product.Ppic, sellerName: Product.sellerName })
          await data.save()
            .then(result => {
              if (result) {
                res.json({ code: 200, msg: "Added to Cart" })
              }
              else {
                res.json({  code: 400, msg: "Something Went Wrong " })
              }
            })
        }
        else {
          let qty = prod[0].Pquantity + 1
          await cart.findByIdAndUpdate(prod[0]._id, { Pquantity: qty })
            .then(result => {
              if (result) {
                res.json({ code: 200, msg: "Item Increase" })
              }
              else res.json({  code: 400, msg: "not increase" })
            })
        }
      }
    }
    else {
      res.json({ code: 401, msg: "Item out of stock" })
    }
  }
})




cartRouter.post("/decrease/:id", requireLogin, (req, res) => {
  const id = req.params.id
  findIncart(id)
  async function findIncart(id) {
    const prod = await cart.findById(id)
    const qty = prod.Pquantity - 1
    cart.findByIdAndUpdate(prod._id, { Pquantity: qty })
      .then(result => {
        if (result) {
          res.json({ code: 200, msg: "Item Decrease"})
        }
        else res.json({  code: 400,msg: "not decrease" })
      })
  }
})


cartRouter.get("/showCart", requireLogin, async (req, res) => {
  await cart.find()
    .then(data => res.json(data))
})


cartRouter.post('/cancelFromCart', requireLogin, async (req, res) => {
  let pid = req.body.Pid
  try {
    const data = await cart.findByIdAndDelete(pid)
    if (data) {
      res.json({ code: 200, msg: 'Item Removed From Cart' })
    }
    else {
      res.json({ code: 400, msg: 'Something Went Wrong' })
    }
  } catch (error) {
    res.json({ code: 500, msg: 'Internal Server Error' })
  }
})
export default cartRouter
