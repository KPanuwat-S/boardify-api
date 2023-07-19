const { Board, Workspace, Payment } = require("../models");

exports.createBoard = (board) => Board.create(board);

exports.getAllBoardsByWorkspaceId = async (workspaceId) =>
  await Board.findAll({ where: { workspaceId: workspaceId } });

exports.editBoardName = async (id, name) =>
  await Board.update({ name }, { where: { id } });

// exports.getOneBoard = async (id) => await Board.findByPk(id);
exports.getOneBoard = async (id) => {
  const board = await Board.findOne({ where: { id }, include: Workspace });
  const isPremium = await Payment.findOne({
    where: { userId: board?.Workspace?.userId },
  });
  const dataObj = JSON.parse(JSON.stringify(board));
  const newData = { ...dataObj, isPremium: !!isPremium };
  return newData;
};
