// import express from "express"
// import Razorpay from 'razorpay';
// import crypto from 'crypto'
// const payRouter=express.Router()


// const razorpay = new Razorpay({
//     key_id: 'rzp_test_jcq1W2rqZQOleh',
//     key_secret: 'cHo1oWKWRR5AFgytf0j4f3YM'
//   });

//   payRouter.post('/create-order', async (req, res) => {
//     const options = {
//         amount: req.body.amount*100,
//         currency: 'INR',
//     };
//     try {
//         const response = await razorpay.orders.create(options);
//         res.json({
//             id: response.id,
//             currency: response.currency,
//             amount: response.amount,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });

// payRouter.post('/payment-callback', (req, res) => {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
//    // console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature)
//     const expectedSignature = crypto
//       .createHmac('sha256', 'cHo1oWKWRR5AFgytf0j4f3YM')
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');
//     if (expectedSignature === razorpay_signature) {
//       // Payment is authentic, update the order status in the database
//       // Send a success response to the client
//       //console.log("pppppp")
//       res.status(200).json({ message: 'Payment successful' });
//     } else {
//       // Payment is not authentic, send a failure response to the client
//       res.status(400).json({ message: 'Payment Failed' });
//     }
//   });

// export default payRouter;
// import express from "express"
// import Razorpay from 'razorpay';
// import crypto from 'crypto'
// const payRouter=express.Router()


// const razorpay = new Razorpay({
//     key_id: 'rzp_test_jcq1W2rqZQOleh',
//     key_secret: 'cHo1oWKWRR5AFgytf0j4f3YM'
//   });

//   payRouter.post('/create-order', async (req, res) => {
//     const options = {
//         amount: req.body.amount*100,
//         currency: 'INR',
//     };
//     try {
//         const response = await razorpay.orders.create(options);
//         res.json({
//             id: response.id,
//             currency: response.currency,
//             amount: response.amount,
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });

// payRouter.post('/payment-callback', (req, res) => {
//     const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
//    // console.log(razorpay_payment_id, razorpay_order_id, razorpay_signature)
//     const expectedSignature = crypto
//       .createHmac('sha256', 'cHo1oWKWRR5AFgytf0j4f3YM')
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');
//     if (expectedSignature === razorpay_signature) {
//       // Payment is authentic, update the order status in the database
//       // Send a success response to the client
//       //console.log("pppppp")
//       res.status(200).json({ message: 'Payment successful' });
//     } else {
//       // Payment is not authentic, send a failure response to the client
//       res.status(400).json({ message: 'Payment Failed' });
//     }
//   });

// export default payRouter;