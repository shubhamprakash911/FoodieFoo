const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

async function userRegistration(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await UserModel.find({ email });

    if (user.length === 0) {
      const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUND);
      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();
      res.status(200).json({
        status: true,
        msg: "User register successfully",
      });
    } else {
      return res.status(409).json({
        status: false,
        msg: "Email-id already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error while registration",
    });

    console.log(error);
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
          );
          res
            .status(200)
            .json({ status: true, token, msg: "Login successful", data: user });
          res.cookie("token", token);
        } else {
          res.status(403).json({
            status: false,
            msg: "Wrong Credentails",
          });
        }
      });
    } else {
      res.status(404).json({
        status: false,
        msg: "User not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Internal Server Error while Login",
    });
  }
}

module.exports = { userRegistration, userLogin };
