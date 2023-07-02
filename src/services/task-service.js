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

exports.addTask = (input) => Task.create(input);

exports.deleteTaskById = (id) => Task.destroy({ where: { id } });

exports.updateTaskById = (
  name,
  description,
  position,
  cardId,
  labelId,
  attachmentId,
  userId,
  dueDate,
  id
) =>
  Task.update(
    {
      name,
      dueDate,
      description,
      position,
      cardId,
      labelId,
      userId,
      attachmentId,
    },
    { where: { id } }
  );

//attachment
exports.createAttachment = (file, userId, t) =>
  Attachment.create({ file, userId }, { transaction: t });
exports.addAttachmentIdInTask = (id, attachmentId, t) =>
  Task.update({ attachmentId }, { where: { id }, transaction: t });
exports.deleteAttachment = (id, t) =>
  Attachment.destroy({ where: { id }, transaction: t });
exports.updateAttachmentIdInTask = (attachmentId, t) =>
  Task.update(
    { attachmentId: null },
    { where: { attachmentId }, transaction: t }
  );

// Checklist
exports.addChecklist = (checklistObject) => {
  console.log("addchecklist");
  ChecklistItem.create({
    description: checklistObject.description,
    // isChecked: checklistObject.isChecked,
    taskId: checklistObject.taskId,
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

exports.deleteChecklist = (checklistId) => {
  ChecklistItem.destroy({ where: { id: checklistId } });
};
// exports.findTask = (id) => Task.id
