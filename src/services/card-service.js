const {
  User,
  Workspace,
  Board,
  BoardMember,
  Card,
  Task,
  TaskMember,
  Comment,
  ChecklistItem,
  label,
} = require("../models");

exports.findAdminByWorkSpaceId = (boardId) => {
  return Workspace.findOne({
    attributes: {
      exclude: ["name", "createdAt", "updatedAt", "workspaceId", "id"],
    },
    include: {
      model: Board,
      where: { id: boardId },
      attributes: {
        exclude: [
          "name",
          "createdAt",
          "updatedAt",
          "workspaceId",
          "userId",
          "id",
        ],
      },
    },
  });
};
// {
//     where: { id: boardId },
//     attributes: { exclude: ["name", "createdAt", "updatedAt", "workspaceId"] },
//     include: {
//       model: Card,
//       where: { boardId: boardId },
//       attributes: { exclude: ["createdAt", "updatedAt"] },
//     },
//   });
exports.findCardsByBoardId = (boardId) => {
  return Board.findAll({
    where: { id: boardId },
    include: {
      model: BoardMember,
    },
  });
};
