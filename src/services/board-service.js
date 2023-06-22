const { Workspace, Board } = require("../models");

exports.getBoard = async (id) => {
  const board = await Board.findAll({
    where: { userId: id },
    include: [
      {
        model: Workspace,
      },
    ],
  });

  return board;
};

exports.createBoard = (board) => Board.create(board);
