const user = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT for generating tokens

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("req.body", req.body);

  try {
    const existingUser = await user.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json("User with this email already exists.");
    }

    // Hash the password before saving it to the database
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return res.status(500).json("Error hashing the password.");
      }

      const newUser = await user.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json("Error creating the user.");
  }
};

function generateAccessToken(id, premium) {
  // return (accessToken = jwt.sign({ id }, "secretkey"));
  return jwt.sign({ userId: id,premium }, "secretkey");
}

// exports.signin = async (req, res) => {
//   const { Email, Password } = req.body;
//   // console.log("email: ", Email, "pass :", Password);

//   try {
//     // Find the user by email
//     const existingUser = await user.findOne({
//       where: {
//         email: Email,
//       },
//     });

//     if (!existingUser) {
//       return res.status(404).json("User does not exist");
//     }

//     // Compare the entered password with the stored hashed password
//     bcrypt.compare(Password, existingUser.password, (err, result) => {
//       if (err || !result) {
//         return res.status(401).json("Invalid password");
//       }
//       const check = existingUser.ispremiumuser;
//       console.log("value of isprime = ", check);

//       if (check === null) {
//         res
//           .status(200)
//           .json({ isprime: 0, token: generateAccessToken(existingUser.id) });
//       } else {
//         res
//           .status(200)
//           .json({ isprime: 1, token: generateAccessToken(existingUser.id) });
//       }
//       // res.status(200).json(existingUser.id);
//     });
//   } catch (error) {
//     res.status(500).json("Error signing in");
//   }
// };


exports.signin = async (req, res) => {
  const { Email, Password } = req.body;
  // console.log("email: ", Email, "pass :", Password);

  try {
    // Find the user by email
    const existingUser = await user.findOne({
      where: {
        email: Email,
      },
    });

    if (!existingUser) {
      return res.status(404).json("User does not exist");
    }

    // Compare the entered password with the stored hashed password
    bcrypt.compare(Password, existingUser.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json("Invalid password");
      }
      const check = existingUser.ispremiumuser;
      console.log("value of isprime = ", check);

      res.status(200).json({token: generateAccessToken(existingUser.id,check) });
      // res.status(200).json(existingUser.id);
    });
  } catch (error) {
    res.status(500).json("Error signing in");
  }
};
