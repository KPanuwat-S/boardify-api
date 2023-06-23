const {
  User,
  Board,
  Card,
  Task,
  Workspace,
  ChecklistItem,
  Comment,
  Label,
  BoardMember,
  TaskMember,
  Attachment,
} = require("../models");

exports.findCardsByBoardId = (boardId) => {
  return Workspace.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    include: {
      model: Board,
      where: { id: boardId },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: BoardMember,
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          model: Card,
          where: { boardId: boardId },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "boardId"],
          },
          include: {
            model: Task,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "deletedAt",
                "attachmentId",
                "cardId",
                "commentId",
                "labelId",
                "userId",
              ],
            },
            include: [
              {
                model: Label,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt", "id"],
                },
              },
              {
                model: ChecklistItem,
              },
              {
                model: Comment,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
              {
                model: TaskMember,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
              {
                model: Attachment,
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
              },
            ],
          },
        },
      ],
    },
  });
};

exports.findBoardById = (boardId) =>
  Board.findOne({
    where: { id: boardId },
  });
exports.createCard = (data) => Card.create(data);

exports.deleteCardById = (cardId) => Card.destroy({ where: { id: cardId.id } });
