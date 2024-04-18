import express from 'express';
import dotenv from'dotenv';
import router from './router/savingUser.js'
import productRouter from './router/Product.js'
// import payRouter from './router/payments.js'
import mongoose from 'mongoose';
import cors from 'cors';
import cartRouter from './router/Cart.js';
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

try{
    await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`MongoDB Connected--`);
 }catch(e){
     console.log('Mongo DB Error ---',e)
 }

app.use(router)
app.use(productRouter)
app.use(cartRouter)
// app.use(payRouter)

const port =process.env.PORT || 5000
app.listen(port,()=>console.log(`runnning at ${port}`))