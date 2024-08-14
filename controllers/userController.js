const user = require("../models/user");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const path = require("path");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const register_user = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const users = new user({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: spassword,
      usertype: "user",
    });

    const useremail = await user.findOne({ email: req.body.email });

    const userphone = await user.findOne({ phone: req.body.phone });

    if (useremail) {
      res
        .status(200)
        .send({ success: false, msg: "This email is already exist" });
    } else if (userphone) {
      res
        .status(200)
        .send({ success: false, msg: "This phone number is already exist" });
    } else {
      const user_data = await users.save();
      res.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const create_token = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, "thisisthesecretkey", { expiresIn: '1h' }); 
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

//login Method

const user_login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    let userData;

    if (email) {
      userData = await user.findOne({ email: email });
    } else if (phone) {
      userData = await user.findOne({ phone: phone });
    }

    if (userData) {
      const passwordMatch = await bcryptjs.compare(password, userData.password);

      if (passwordMatch) {
        const tokenData = await create_token(userData._id);

        const userResult = {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          type: userData.type,
          token: tokenData,
        };

        res.status(200).send({
          success: true,
          msg: "User Details",
          data: userResult,
        });
      } else {
        res.status(200).send({ success: false, msg: "Login details are incorrect" });
      }
    } else {
      res.status(200).send({ success: false, msg: "Login details are incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};



const get_user = async(req,res) =>
{
  const getdata = await user.find();
  res.json({data:getdata});
}


const delete_user = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and delete the user
    const userToDelete = await user.findByIdAndDelete(userId);

    if (userToDelete) {
      res.status(200).send({ success: true, msg: "User deleted successfully" });
    } else {
      res.status(404).send({ success: false, msg: "User not found" });
    }
  } catch (error) { 
    res.status(400).send(error.message);
  }
};

exports.get_user = get_user; 
exports.delete_user = delete_user;
exports.user_login = user_login;
exports.register_user = register_user;

