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
  // return Workspace.findOne({
  //   attributes: { exclude: ["createdAt", "updatedAt"] },
  //   include: {
  //     model: Board,

  //     attributes: { exclude: ["createdAt", "updatedAt"] },

  //     include: [
  //       {
  //         model: Card,

  //         attributes: {
  //           exclude: ["createdAt", "updatedAt", "boardId"],
  //         },

  //         include: {
  //           model: Task,
  //           where: { id },
  //           attributes: {
  //             exclude: ["createdAt", "updatedAt", "cardId"],
  //           },
  //           include: [
  //             {
  //               model: Label,
  //               attributes: {
  //                 exclude: ["createdAt", "updatedAt", "id"],
  //               },
  //             },
  //             {
  //               model: ChecklistItem,
  //             },
  //             {
  //               model: Comment,
  //               include: { model: User },
  //               attributes: {
  //                 exclude: ["createdAt", "updatedAt"],
  //               },
  //             },
  //             {
  //               model: TaskMember,
  //               include: { model: User },
  //               attributes: {
  //                 exclude: ["createdAt", "updatedAt"],
  //               },
  //             },
  //             //

  //             //
  //             {
  //               model: Attachment,
  //               attributes: {
  //                 exclude: ["createdAt", "updatedAt"],
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  // });
  return Task.findOne({
    where: { id },
    include: [
      {
        model: Card,

        attributes: {
          exclude: ["createdAt", "updatedAt", "boardId"],
        },

        // include: {
        //   model: Task,
        //   where: { id },
        //   attributes: {
        //     exclude: ["createdAt", "updatedAt", "cardId"],
        //   },
  
      },
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
        include: { model: User },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: TaskMember,
        include: { model: User },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      // },
    ],
  });
};
exports.deleteTaskById = (id) => Task.destroy({ where: { id } });
exports.updateTaskById = (
  name,
  description,
  position,
  cardId,
  labelId,
  attachment,
  userId,
  id,
  dueDate,
  isDone
) => {
  console.log("data to db", {
    name,
    description,
    position,
    cardId,
    labelId,
    attachment,
    userId,
    id,
    dueDate,
  });
  return Task.update(
    {
      name,
      description,
      cardId,
      labelId,
      userId,
      dueDate,
      position,
      attachment,
      isDone,
    },
    { where: { id } }
  );
};
//addtask
exports.addTask = (input) => Task.create(input);
exports.findCardById = (id) => Card.findAll({ where: { id } });
exports.findTaskByCardIdMax = (cardId) => {
  Task.findAll({
    where: { cardId },
    order: [[sequelize.literal("position"), "DESC"]],
    limit: 1,
  });
  console.log("checklistObject", checklistObject);
};

exports.addChecklist = (checklistObject) => {
  return ChecklistItem.create({
    description: checklistObject.description,
    taskId: checklistObject.taskId,
  });
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
  TaskMember.findAll({ where: { taskId: taskId.id } });
