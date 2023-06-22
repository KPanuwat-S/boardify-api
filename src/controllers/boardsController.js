const boardService = require("../services/board-service");

exports.getAllBoard = async (req, res, next) => {
  try {
    const boardData = await boardService.findAllBoard();

    res.status(200).json(boardData);
  } catch (err) {
    next(err);
  }
};

exports.createBoard = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);

    await boardService.create(value);

    res.status(200).json({
      message: "สร้างสำเร็จ",
      payload: value,
    });
  } catch (err) {
    next(err);
  }
};
