const Users = require("../models/user.model");

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
      const user = new Users({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
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
    } else if (userData.password != password) {
      res.status(400).send({
        success: false,
        message: "Invaild email or Password",
      });
    } else {
      res.status(200).send({
        success: true,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
    });
  }
};
