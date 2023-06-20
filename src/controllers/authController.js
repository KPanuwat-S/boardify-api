const {
    validateRegister,
    validateLogin,
  } = require("../validators/authValidator");

  exports.register = async (req, res, next) => {
    try {
      const value = validateRegister(req.body);
  
      value.password = await bcryptService.hash(value.password);
  
      const User = await user.create(value);
      // const User = await staff.create(value);
  
      const accessToken = tokenService.sign({ id: User.id });
      res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  };
  
  exports.login = async (req, res, next) => {
    try {
      const { mobile, password } = validateLogin(req.body);
      // console.log(req.body);
  
      const Staff = await staff.findOne({ where: { mobile } });
      console.log(Staff);
      const User = await user.findOne({ where: { mobile } });
      console.log(User);
      if (!User && !Staff) {
        createError("invalid credential1", 400);
      }
  
      if (User) {
        const isCorrect = await bcryptService.compare(password, User.password);
        if (!isCorrect) {
          createError("invalid credential2", 400);
        }
        const accessToken = tokenService.sign({ id: User.id });
        res.status(200).json({ accessToken , role : "user"});
      }
  
      if (Staff) {
        const isCorrect = await bcryptService.compare(password, Staff.password);
        if (!isCorrect) {
          createError("invalid credential2", 400);
        }
        const accessToken = tokenService.sign({ id: Staff.id });
        res.status(200).json({ accessToken , role : "staff"});
      }
  
      // const isCorrectStaff = await bcryptService.compare(
      //   password,
      //   Staff.password
      // );
      // if (!isCorrect) {
      //   createError("invalid credential2", 400);
      // }
  
      // const accessToken = tokenService.sign({ id: User.id });
      // res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  };
  
  exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.User });
  };
  
  exports.getMeStaff = (req, res, next) => {
    res.status(200).json({ staff: req.Staff });
  };
  