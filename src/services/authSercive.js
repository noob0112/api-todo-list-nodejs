const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRep.js");

// Config
const { passwordSec } = require("../configs/index.js");

const authService = {
  register: async (data) => {
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: CryptoJS.AES.encrypt(data.password, passwordSec).toString(),
    });

    const user = await userRepository.createUser(newUser);

    return user;
  },

  login: async (req) => {
    const user = await userRepository.findOneUser({ email: req.body.email });
    const hashedPassord = CryptoJS.AES.decrypt(user.data.password, passwordSec);
    const originalPassword = hashedPassord.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return {
        statusCode: 401,
        data: "Wrong credentials!",
      };
    }

    const accessToken = jwt.sign(
      {
        id: user.data._id,
      },
      passwordSec,
      {
        expiresIn: "30d", // expires in 30d
      }
    );

    const { _id, name, email, ...orther } = user.data._doc;

    return {
      statusCode: 201,
      data: { _id, name, email, accessToken },
    };
  },
};

module.exports = authService;
