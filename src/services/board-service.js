const { Board, Workspace } = require("../models");

exports.createBoard = (board) => Board.create(board);

exports.getAllBoardsByWorkspaceId = async (workspaceId) =>
  await Board.findAll({ where: { workspaceId: workspaceId } });

exports.editBoardName = async (id, name) =>
  await Board.update({ name }, { where: { id } });

exports.getOneBoard = async (id) => await Board.findByPk(id);
