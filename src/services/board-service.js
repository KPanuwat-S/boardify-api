const { Board, Workspace } = require("../models");

exports.createBoard = (board) => Board.create(board);

exports.getAllBoardsByWorkspaceId = async (workspaceId) =>
  await Board.findAll({ where: { workspaceId: workspaceId } });
