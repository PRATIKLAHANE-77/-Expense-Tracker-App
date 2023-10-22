const Razorpay = require("razorpay");
const Order = require("../model/order");
require("dotenv").config();

exports.purchasepremium = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      //   req.user
      //     .createOrder({ orderid: order.id, status: "PENDING" })
      //     .then(() => {
      //       return res.status(201).json({ order: order, key_id: rzp.key_id });
      //     })
      //     .catch((err) => {
      //       throw new Error(err);
      //     });
      Order.create({
        orderid: order.id,
        status: "PENDING",
        modelId: req.user.id, // Assuming req.user has an 'id' property
      })
        .then((newOrder) => {
          // Handle success, and return a response
          res.status(201).json({ order: newOrder, key_id: rzp.key_id });
        })
        .catch((err) => {
          // Handle any errors
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ massage: "something went wrong", error: err });
  }
};

exports.updatetransactionstatus = async (req, res) => {
  try {
    const { order_id, payment_id } = req.body;
    user = req.user;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 =  order.update({ paymentid: payment_id, status: "successful" });
    const promise2 =  user.update({ ispremiumuser: true });
    await Promise.all([promise1, promise2]).then(()=>{
        return res
      .status(202)
      .json({ success: true, message: "transaction done successfully" }); 
    }).catch((err)=>{
       throw new Error(err);
 
    })
    
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "something went wrong" });
  }
};

// exports.updatetransactionstatus = (req, res) => {
//   const { order_id, payment_id } = req.body;
//   user = req.user;
//   Order.findOne({ where: { orderid: order_id } })
//     .then((order) => {
//       order
//         .update({ paymentid: payment_id, status: "successful" })
//         .then(() => {
//           user
//             .update({ ispremiumuser: true })
//             .then(() => {
//               return res
//                 .status(202)
//                 .json({
//                   success: true,
//                   message: "transaction done successfully",
//                 });
//             })
//             .catch((err) => {
//               throw new Error(err);
//             });
//         })
//         .catch((err) => {
//           throw new Error(err);
//         });
//     })
//     .catch((err) => {
//       throw new Error(err);
//     });
// };
