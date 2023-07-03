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
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
/////get
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
////add
exports.findBoardById = (boardId) =>
  Board.findOne({
    where: { id: boardId },
  });
exports.findCardMaxPosition = (boardId) => {
  return Card.findAll({
    where: { boardId },
    order: [[sequelize.literal("position"), "DESC"]],
    limit: 1,
  });
};
exports.createCard = (data) => Card.create(data);
//updateName
////update
exports.findCardById = (boardId, id) => {
  return Board.findOne({
    where: { id: boardId },
    include: {
      model: Card,
      where: { [Op.and]: [{ id }, { boardId }] },
    },
  });
};
//update Dnd
exports.updateCard = (card, index, boardId) => {
  console.log(card, index, boardId);
  Card.update(
    { position: +index + 1 },
    { where: { boardId, id: card.cardId } }
  );
};
exports.updateTask = (data, index, cardId) =>
  Task.update({ position: +index + 1, cardId }, { where: { id: data.taskId } });

///delete
exports.findTaskByCardId = (cardId) => {
  return Card.findAll({
    where: { id: cardId },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "deletedAt",
        "name",
        "description",

        "userId",
      ],
    },
    include: {
      model: Task,
      where: { cardId },
      include: [
        {
          model: TaskMember,
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
        {
          model: Attachment,
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "file", "userId"],
          },
        },
        {
          model: Comment,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "deletedAt",
              "comment",
              "userId",
            ],
          },
        },
      ],
    },
  });
};
exports.deleteCardById = (id, t) => {
  return Card.destroy({ where: { id }, transaction: t });
};
exports.deleteAttachment = (id, t) => {
  return Attachment.destroy({ where: { id }, transaction: t });
};
exports.deleteTaskMembers = (id, t) => {
  return TaskMember.destroy({ where: { id }, transaction: t });
};
exports.deleteTaskById = (id, t) => {
  return Task.destroy({ where: { id }, transaction: t });
};
// exports.deleteComments = (id, t) =>
//   Comment.destroy({ where: { id }, transaction: t });
