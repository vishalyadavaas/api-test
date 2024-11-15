const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

exports.registration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userData = await Users.findOne({ email: email });
    if (userData) {
      res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = new Users({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
      });
      
      const response = await user.save();
      if (response) {
        res.status(200).send({
          success: true,
          message: "User Created Successfully",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({
        success: false,
        message: "EmailId and password both required",
      });
    }

    const userData = await Users.findOne({ email: email });
    
    if (!userData) {
      res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, userData.password); 
    if (!isMatch) {
      res.status(400).send({
        success: false,
        message: "Invaild email or Password",
      });
    } else {
      const palyoad = {
        email: userData.email,
        userId: userData._id,
      }

      const accessToken = jwt.sign(palyoad, JWT_SECRET, {
        expiresIn: "1d",
      })
      res.status(200).send({
        success: true,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        accessToken: accessToken
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
    });
  }
};
