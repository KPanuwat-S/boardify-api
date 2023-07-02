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

exports.findCardsByBoardId = (boardId) => {
  return Workspace.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Board,
      where: { id: boardId },
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: [
        {
          model: BoardMember,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },

        {
          model: Card,
          where: { boardId: boardId },
          attributes: {
            exclude: ["createdAt", "updatedAt", , "boardId"],
          },

          include: {
            model: Task,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                ,
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
                  exclude: ["createdAt", "updatedAt", , "id"],
                },
              },
              {
                model: ChecklistItem,
              },
              {
                model: Comment,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: TaskMember,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Attachment,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
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
exports.findCardById = (boardId, cardId) => {
  return Board.findOne({
    where: { id: boardId },
    include: {
      model: Card,
      where: { [Op.and]: [{ id: cardId }, { boardId }] },
    },
  });
};
exports.updateCard = (data, name, position) =>
  Card.update({ name, position }, { where: { id: data.id } });
exports.createCard = (data) => Card.create(data);

exports.deleteCardById = (cardId) => Card.destroy({ where: { id: cardId.id } });

exports.createCard = (data) => Card.create(data);
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
exports.updateCard = (data, name, position) =>
  Card.update({ name, position }, { where: { id: data.id } });

exports.createCard = (data) => Card.create(data); ///delete

exports.findTaskByCardId = (cardId) => {
  exports.deleteCardById = (cardId) =>
    Card.destroy({ where: { id: cardId.id } });
  return Task.findAll({
    where: { cardId },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        ,
        "name",
        "description",
        "position",
        "dueDate",
        "labelId",
        "userId",
      ],
    },
    include: [
      {
        model: TaskMember,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: Attachment,
        attributes: {
          exclude: ["createdAt", "updatedAt", , "file", "userId"],
        },
      },
      {
        model: Comment,
        attributes: {
          exclude: ["createdAt", "updatedAt", , "comment", "userId"],
        },
      },
    ],
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
