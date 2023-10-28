
// pratik code
// const Sib = require("sib-api-v3-sdk");
// require("dotenv").config();
// exports.forgotpassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     console.log("email", email);
//     const client = Sib.ApiClient.instance;

//     const apikey = client.authentications["api-key"];
//     apikey.apikey = process.env.API_KEY;
//     console.log("key = ", process.env.API_KEY);

//     const tranEmailApi = new Sib.TransactionalEmailsApi();

//     const sender = {
//       email: "pratik.lahane1999@gmail.com",
//     };

//     const receivers = [
//       {
//         email: email,
//       },
//     ];

//     const message =await tranEmailApi.sendTransacEmail({
//       sender,
//       to: receivers,
//       subject: "Password Reset",
//       textContent: `click here to reset your password`,
//     });
//     res.status(200).json({message:message});
//   }catch (err) {
//     res.status(500).json({ error: err.message });
// }
// };


//mir code
// const sib = require("sib-api-v3-sdk");
// const User = require('../model/user');
// require('dotenv').config();

// exports.forgotpassword=async(req,res)=>{
//     try {
//         const userEmail = req.body.email;
//         const defaultClient = sib.ApiClient.instance;
//         const apiKey = defaultClient.authentications['api-key'];
//         apiKey.apiKey = process.env.API_KEY;
//         const transEmailApi = new sib.TransactionalEmailsApi();

//         const sender = {
//             email: "pratik.lahane1999@gmail.com",
//             name: "Pratik"
//         }

//         const receiver = [
//             {
//                 email:userEmail
//             }
//         ];

//         // Send the password reset email
//        const message=await transEmailApi.sendTransacEmail({
//             sender,
//             to: receiver,
//             subject: "Password Reset",
//             textContent:`click here to reset your password`

//         })


//         res.status(200).json({ message: message });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


// yash code

// const uuid = require('uuid');
// const sgMail = require('@sendgrid/mail');
// const bcrypt = require('bcrypt');

// const User  = require('../model/user');
// const Forgotpassword = require('../model/forgotpassword');

// exports.forgotpassword = async (req, res) => {
//     try {
//         const email =  req.body.email;
//         const user = await User.findOne({where : { email }});
//         if(user){
//             const id = uuid.v4();
//             user.createForgotpassword({ id , active: true })
//                 .catch(err => {
//                     throw new Error(err)
//                 })

//             sgMail.setApiKey(process.env.API_KEY)

//             const msg = {
//                 to: email, // Change to your recipient
//                 from: 'pratik.lahane1999@gmail.com', // Change to your verified sender
//                 subject: 'Sending with SendGrid is Fun',
//                 text: 'and easy to do anywhere, even with Node.js',
//                 html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
//             }

//             sgMail
//             .send(msg)
//             .then((response) => {

//                 // console.log(response[0].statusCode)
//                 // console.log(response[0].headers)
//                 return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

//             })
//             .catch((error) => {
//                 throw new Error(error);
//             })

//             //send mail
//         }else {
//             throw new Error('User doesnt exist')
//         }
//     } catch(err){
//         console.error(err)
//         return res.json({ message: err, sucess: false });
//     }

// }
const sib = require("sib-api-v3-sdk");
const User = require('../model/user');
require('dotenv').config();

exports.forgotPassword=async(req,res)=>{
    try {
        const userEmail = req.body.email;
        const defaultClient = sib.ApiClient.instance;
        const apiKey = defaultClient.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY
        const transEmailApi = new sib.TransactionalEmailsApi();

        const sender = {
            email: "pratik.lahane1999@gmail.com",
            name: "Pratik Lahane"
        }

        const receiver = [
            {
                email:userEmail
            }
        ];

        // Send the password reset email
       const message=await transEmailApi.sendTransacEmail({
            sender,
            to: receiver,
            subject: "Password Reset",
            textContent:`click here to reset your password`

        })


        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}; 