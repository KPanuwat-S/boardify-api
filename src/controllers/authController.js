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
    console.log(checkEmail);

    if (checkEmail.length > 0) createError("Email is duplicate", 400);

    value.password = await bcryptService.hash(value.password);
    const user = await authService.createUser(value);

    const accessToken = tokenService.sign({ id: user.id });

    const url = `http://localhost:${process.env.PORT}/auth/emailconfirmation/${accessToken}`;

    const verifyEmail = await emailVerifyService.verify(value, url);
    // console.log(verifyEmail);

    res.status(200).json("Success");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    console.log(req.body);

    const userBeforeEmailVerify = await User.findOne({
      where: { email: value.email },
    });
    console.log(userBeforeEmailVerify);

    if (!userBeforeEmailVerify.isVerify) {
      createError("Please confirm your email to login.");
    }

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

exports.verify = async (req, res, next) => {
  // console.log("sfdsdsdf");
  const tokenEmail = req.params.token;
  try {
    const payload = tokenService.verifyEmail(tokenEmail);
    console.log(payload);

    const user = await authService.getUserById(payload.id)
    console.log(user);
    if (!user) {
      createError("Email not register", 401)
    }

    await User.update({ isVerify: true }, { where: { id: user.id } });
    // res.status(200).json("Verify Complete");
  } catch (error) {
    next(error);
  }
  return res.redirect("http://localhost:5174/")
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ user: req.user });
};

exports.googleLogin = async (req, res, next) => {
  const { googleId } = req.body.profileObj;
  console.log(req);
  const user = await authService.findByGoogleId(googleId);
  try {
    if (!user) {
      const googleUser = req.body.profileObj;
      const user = {
        firstName: googleUser.givenName,
        lastName: googleUser.familyName,
        email: googleUser.email,
        isVerify: true,
        googleId: googleId,
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
