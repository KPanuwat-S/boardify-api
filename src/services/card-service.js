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
            exclude: ["createdAt", "updatedAt", "boardId"],
          },
          include: {
            model: Task,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
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
                  exclude: ["createdAt", "updatedAt", "id"],
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
exports.findCardByBoard = (boardId) => {
  return Card.findAll({
    where: { boardId },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "type",
        "name",
        "position",
        "boardId",
      ],
    },
  });
};
exports.findTaskByCard = (newData) => {
  return Task.findAll({
    where: {
      cardId: { [Op.in]: newData },
    },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "type",
        "name",
        "position",
        "description",
        "attachmentId",
        "cardId",
        "labelId",
      ],
    },
  });
};
exports.findTaskMemberById = (taskId) => {
  return TaskMember.findAll({
    where: {
      taskId: { [Op.in]: taskId },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Task,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "name",
            "description",
            "position",
            "dueDate",
            "type",
            "attachmentId",
            "cardId",
            "labelId",
            "userId",
          ],
        },
      },
      {
        model: User,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
            "lastName",
            "password",
            "email",
            "isVerify",
            "googleId",
          ],
        },
      },
    ],
  });
};
exports.findUserById = (data) => {
  return User.findAll({
    where: {
      id: { [Op.in]: data },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};
exports.findLabel = (boardId) => {
  return Board.findAll({
    where: { id: boardId },
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "name",
        "userId",
        "workspaceId",
        "id",
      ],
    },
    include: {
      model: Card,
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "name",
          "userId",
          "workspaceId",
          "boardId",
          "position",
          "type",
        ],
      },
      where: { boardId },
      include: {
        model: Task,
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",

            "userId",
            "boardId",
            "position",
            "type",
            "description",
            "attachmentId",
            "cardId",
          ],
        },
        include: [
          {
            model: Label,
            attributes: {
              exclude: ["createdAt", "updatedAt", "color", "id"],
            },
          },
        ],
      },
    },
  });
};
exports.updateCard = (data, name, position) => {
  console.log(data);
  Card.update({ name, position }, { where: { id: data.id } });
};
exports.createCard = (data) => Card.create(data);

exports.updateCardName = (id, name) => Card.update({ name }, { where: { id } });

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
exports.updateCardDnd = (card, index, boardId) => {
  return Card.update(
    { position: +index + 1 },
    { where: { boardId, id: card.id } }
  );
};
exports.updateTaskDnd = (data, index, cardId) =>
  Task.update({ position: +index + 1, cardId }, { where: { id: data.taskId } });
//updateName
exports.updateCardByName = (name, id) => {
  return Card.update({ name }, { where: { id } });
};
///delete
exports.findTaskByCardId = (cardId) => {
  return Card.findAll({
    where: { id: cardId },
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
          exclude: ["createdAt", "updatedAt", "file", "userId"],
        },
      },
      {
        model: Comment,
        attributes: {
          exclude: ["createdAt", "updatedAt", "comment", "userId"],
        },
      },
      {
        model: Comment,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "comment", "userId"],
        },
      },
      {
        model: Comment,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "comment", "userId"],
        },
      },
    ],
  });
};

exports.deleteCardById = (id) => {
  return Card.destroy({ where: { id } });
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
