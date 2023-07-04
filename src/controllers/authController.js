const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const authService = require("../services/auth-service");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const createError = require("../utils/createError");
const { User } = require("../models");
const emailVerifyService = require("../services/emailVerifyService");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);

    const checkEmail = await authService.findByEmail(value.email);

    if (checkEmail.length > 0) createError("Email is duplicate", 400);

    value.password = await bcryptService.hash(value.password);
    const user = await authService.createUser(value);

    const accessToken = tokenService.sign({ id: user.id });

    const url = `http://localhost:${process.env.PORT}/auth/emailconfirmation/${accessToken}`;

    const verifyEmail = await emailVerifyService.verify(value, url);

    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log("hi");
    const value = validateLogin(req.body);

    const userBeforeEmailVerify = await User.findOne({
      where: { email: value.email },
    });

    if (userBeforeEmailVerify && !userBeforeEmailVerify.isVerify) {
      createError("Please confirm your email to login.");
    }
    const user = await authService.checkUserByEmailAndVerify(value.email);
    if (!user) createError("User not Verify", 400);
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

exports.verify = async (req, res, next) => {
  const tokenEmail = req.params.token;
  try {
    const payload = tokenService.verifyEmail(tokenEmail);

    const user = await authService.getUserById(payload.id);

    if (!user) {
      createError("Email not register", 401);
    }

    await User.update({ isVerify: true }, { where: { id: user.id } });
    // res.status(200).json("Verify Complete");
  } catch (error) {
    next(error);
  }
  return res.redirect("http://localhost:5173/welcoming");
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.googleLogin = async (req, res, next) => {
  const { data } = req.body;
  console.log("req", data);

  console.log("data", data.email);
  const user = await authService.findByEmail(data.email);
  try {
    if (!user) {
      const googleUser = req.body.profileObj;
      const user = {
        firstName: data["given_name"],
        lastName: data["family_name"],
        email: data.email,
        isVerify: true,
      };
      await authService.createUser(user);
    }
    const accessToken = tokenService.sign({ id: user.id });
    console.log("accesstoken form gglogin fn", accessToken);
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
