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
  User,
} = require("../models");
exports.findTaskById = (id) => {
  return Workspace.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Board,

      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: [
        {
          model: Card,

          attributes: {
            exclude: ["createdAt", "updatedAt","boardId"],
          },

          include: {
            model: Task,
            where: { id },
            attributes: {
              exclude: ["createdAt", "updatedAt","cardId"],
            },
            include: [
              {
                model: Label,
                attributes: {
                  exclude: ["createdAt", "updatedAt","id"],
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
                include: User,
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
exports.deleteTaskById = (id) => Task.destroy({ where: { id } });
exports.updateTaskById = ({ name, description, cardId, labelId, userId, id }) =>
  Task.update(
    { name, description, cardId, labelId, userId },
    { where: { id } }
  );
//addtask
exports.findCardById = (id) => Card.findAll({ where: { id } });
exports.findTaskByCardIdMax = (cardId) =>{
  Task.findAll({
    where: { cardId },
    order: [[sequelize.literal("position"), "DESC"]],
    limit: 1,
  });
  console.log("checklistObject", checklistObject);
};
exports.updateChecklistItems = (checklistObject) =>
  ChecklistItem.update(
    {
      description: checklistObject.description,
      isChecked: checklistObject.isChecked,
      taskId: checklistObject.taskId,
    },
    { where: { id: checklistObject.id } }
  );

exports.deleteChecklist = (checklistId) =>
  ChecklistItem.destroy({ where: { id: checklistId } });

// exports.findTask = (id) => Task.id

exports.addMemberToTask = (taskId, userId) =>
  TaskMember.create({ taskId: taskId, userId: userId });

exports.removeMemberFromTask = (taskId, userId) =>
  TaskMember.destroy({ where: { taskId: taskId, userId: userId } });

exports.getMemberInTask = (taskId) =>
  TaskMember.findAll({ where: { taskId: taskId } });
