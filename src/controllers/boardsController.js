exports.getBaords = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Hi, this is board" });
  } catch (err) {
    next(err);
  }
};
