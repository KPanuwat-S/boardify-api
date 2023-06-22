const { Board } = require("../models");

exports.getBoard = async (id) => {
  //หา workspaces ทั้งหมด
  const board = await Board.findAll({
    where: { userId: id },
    include: [
      {
        model: Board,
      },
    ],
  });

  return board;
};

exports.createBoard = (board) => Board.create(board);
