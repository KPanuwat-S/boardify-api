const { Op } = require("sequelize");

const {
  Board,
  Card,
  Task,
  TaskMember,
  Label,
  ChecklistItem,
  Workspace,
  Comment,
  Attachment,
  sequelize,
} = require("../models");
exports.findTaskById = (id) => {
  return Workspace.findOne({
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    include: {
      model: Board,

      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },

      include: [
        {
          model: Card,

          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "boardId"],
          },

          include: {
            model: Task,
            where: { id },
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt", "cardId"],
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
exports.deleteTaskById = (id) => Task.destroy({ where: { id } });
exports.updateTaskById = ({ name, description, cardId, labelId, userId, id }) =>
  Task.update(
    { name, description, cardId, labelId, userId },
    { where: { id } }
  );
//addtask
exports.findCardById = (id) => Card.findAll({ where: { id } });
exports.findTaskByCardIdMax = (cardId) =>
  Task.findAll({
    where: { cardId },
    order: [[sequelize.literal("position"), "DESC"]],
    limit: 1,
  });
