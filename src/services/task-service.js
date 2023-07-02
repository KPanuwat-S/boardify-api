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
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: Board,

      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: [
        {
          model: Card,

          attributes: {
            exclude: ["createdAt", "updatedAt", "boardId"],
          },

          include: {
            model: Task,
            where: { id },
            attributes: {
              exclude: ["createdAt", "updatedAt", "cardId"],
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
