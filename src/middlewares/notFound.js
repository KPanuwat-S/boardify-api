module.exports = (req, res) => {
  res.status(404).json({ Message: "Resource not found" });
};
