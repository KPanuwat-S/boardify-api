const createError = require("../utils/createError");
const taskService = require("../services/task-service");
const { sequelize } = require("../models");
exports.getTaskById = async (req, res, next) => {
  try {
    const user = req.user;
    const task = req.params;
    if (!task.id) createError("Task id is required", 400);

    const taskData = await taskService.findTaskById(task.id);

    console.log("taskData", taskData);
    const [[[newData]]] = await taskData.Boards.map((el) => {
      return (newTaskId = el.Cards.map((el) => {
        return el.Tasks;
      }));
    });

    res.status(200).json(newData);
  } catch (error) {
    next(error);
  }
};
// ***

exports.addTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { taskName, position } = req.body;
    const user = req.user;

    const input = { name: taskName, position, userId: user.id, cardId: id };
    console.log("input", input);
    const addedTask = await taskService.addTask(input);
    res.status(200).json(addedTask);
  } catch (err) {
    next(err);
  }
};
//
exports.deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params;
    if (!taskId) createError("Task id is required", 400);
    const checkDelete = await taskService.deleteTaskById(taskId.id);
    if (checkDelete == 0) createError("Not found", 400);
    res.status(200).json({ msg: "Delete Complete" });
  } catch (error) {
    next(error);
  }
};
//****
exports.updateTask = async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const user = req.user;
    console.log("data from be", data);

    if (!id) createError("Task id is required", 400);
    console.log("updateTaskinBackend is running");
    const taskData = await taskService.updateTaskById(
      data.name,
      data.description,
      data.position,
      data.cardId,
      data.labelId,
      data.attachment,
      user.id,
      data.dueDate,
      id
    );
    // if (data.attachment > 0) {
    //   for (const el of data) {
    //     await taskService.updateTaskByAttachmentId(el.attachmentId, id);
    //   }
    // }

    // if (data.comment > 0)
    // if (el.name && el.description)
    //   await taskService.updateTaskByDescription(el.description, id);
    // if (el.dueDate) await taskService.updateTaskByDueDate(el.dueDate, id);
    // if (el.attachmentId)
    //   await taskService.updateTaskByAttachmentId(el.attachmentId, id);

    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
};

exports.addChecklist = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const response = await taskService.addChecklist(data);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
  // }
  // if (data.ChecklistItems.find((el) => el.id !== undefined)) {
  //   const [checklistEdited] = data.ChecklistItems;
  //   console.log("checklistEdited", checklistEdited);
  //   await taskService.updateChecklistItems(checklistEdited);
  // }
};

exports.editChecklist = async (req, res, next) => {
  const data = req.body;
  // const { id } = req.params;
  try {
    await taskService.updateChecklistItems(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteChecklistById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await taskService.deleteChecklist(id);
    res.status(204);
  } catch (err) {
    next(err);
  }
};

///attachment
exports.addAttachment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const taskId = req.params;
    const file = req.file;

    const attachmentData = await taskService.createAttachment(
      file.path,
      user.id
    );
    if (attachmentData.length <= 0) createError("Create fail", 400);

    await taskService.addAttachmentIdInTask(taskId.id, attachmentData.id);
    await t.commit();
    res.status(200).json({ msg: "Update Complete" });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
exports.deleteAttachment = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const attachmentId = req.params;
    const deleteData = await taskService.deleteAttachment(attachmentId.id, t);
    if (deleteData == 0) createError("Delete fail");
    await taskService.updateAttachmentIdInTask(attachmentId.id, t);
    console.log("hi");

    await t.commit();
    res.status(200).json({ msg: "Delete Complete" });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
///comment
// exports.addComment = async (req, res, next) => {
//   try {
//     const taskId = req.params;
//     const user = req.user;
//     const data = req.body;
//     // const checkTaskById = taskService.
//     res.status(200).json("hi");
//   } catch (error) {
//     next(error);
//   }
// };
