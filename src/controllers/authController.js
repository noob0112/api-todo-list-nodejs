const authService = require("../services/authSercive");

//REGISTER
const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);
    return res.status(data.statusCode).json(data.data);
  } catch (error) {
    res.status(error.statusCode).json(error.data);
  }
};

//LOGIN
const login = async (req, res, next) => {
  try {
    const data = await authService.login(req);
    res.status(data.statusCode).json(data.data);
  } catch (error) {
    res.status(error.statusCode).json(error.data);
  }
};

module.exports = { register, login };
