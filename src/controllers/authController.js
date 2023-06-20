const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const authService = require("../services/auth-service");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    const checkEmail = await authService.findByEmail(value.email);
    console.log(checkEmail);
    if (checkEmail.length > 0) createError("Email is duplicate", 400);
    value.password = await bcryptService.hash(value.password);
    const user = await authService.createUser(value);

    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await authService.checkUserByEmail(value.email);
    if (!user) createError("User not found", 400);
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      createError("invalid credential2", 400);
    }
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
