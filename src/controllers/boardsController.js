const boardService = require("../services/board-service");

exports.createBoard = async (req, res, next) => {
  try {
    const value = req.body;

    await boardService.createBoard(value);

    res.status(200).json({
      message: "สร้างสำเร็จ",
      payload: value,
    });
  } catch (err) {
    next(err);
  }
};
