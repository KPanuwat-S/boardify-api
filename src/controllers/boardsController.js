const boardService = require("../services/board-service");

exports.getAllBoard = async (req, res, next) => {
  let response = {};
  try {
    const user = 1;
    const boardData = await boardService.getBoard(user);
    response = {
      boardData: {
        userId: user,
        board: boardData,
      },
    };

    res.status(200).json(response);
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
