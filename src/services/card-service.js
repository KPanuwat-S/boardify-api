const { User, Board, Card, Task, Workspace } = require("../models");

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
  return Workspace.findAll({
    attributes: {
      exclude: ["name", "createdAt", "updatedAt", "workspaceId", "id"],
    },
    include: {
      model: Board,
      where: { id: boardId },
      attributes: {
        exclude: ["createdAt", "updatedAt", "workspaceId", "userId"],
      },
      include: {
        model: Card,
        where: { id: boardId },
        attributes: {
          exclude: ["createdAt", "updatedAt", "position", "boardId"],
        },
        include: {
          model: Task,
          where: { id: boardId },
          attributes: {
            exclude: ["createdAt", "updatedAt", "position", "boardId"],
          },
          include: {
            model: Task,
            where: { id: boardId },
            attributes: {
              exclude: ["createdAt", "updatedAt", "position", "boardId"],
            },
          },
        },
      },
    },
  });
};
