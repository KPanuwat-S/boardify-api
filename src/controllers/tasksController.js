const createError = require("../utils/createError");
const taskService = require("../services/task-service");
const { sequelize } = require("../models");
exports.getTaskById = async (req, res, next) => {
  try {
    const user = req.user;
    const task = req.params;
    if (!task.id) createError("Task id is required", 400);

    const taskData = await taskService.findTaskById(task.id);

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
exports.updateTask = async (req, res, next) => {
  try {
    const data = req.body;
    const taskId = req.params;
    const user = req.user;

    if (!id) createError("Task id is required", 400);

    const taskData = await taskService.updateTaskById(
      data.name,
      data.description,
      data.cardId,
      data.labelId,
      user.id,
      taskId.id
    );

    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
};
exports.addTask = async (req, res, next) => {
  try {
    const data = req.body;
    const { cardId } = req.params;
    const checkCard = taskService.findCardById(cardId);
    if (!checkCard) createError("Data is Duplicate", 400);
    const checkMaxPosition = taskService.findTaskByCardIdMax(checkCard.id);
    if (!checkMaxPosition) createError("Task Error", 400);
    const TaskData = taskService.create;
    res.status(200).json("hi");
  } catch (error) {
    next(error);
  }
};
