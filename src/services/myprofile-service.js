const { where } = require("sequelize");
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

// ?sort=board;order=asc
// ?sort=dueDate;order=desc
exports.getProject = async (userId, sortBy) => {
  const sortDefult = [];
  const sortBoard = [["name", "asc"]];
  const sortTask = [
    ["id", "asc"],
    [Card, "name", "asc"],
    [Card, Task, "due_date", "asc"],
  ];
  // const order = sortBy === "board" ? sortBoard : sortTask;

  let order;

  if (sortBy === "board") {
    order = sortBoard;
  } else if (sortBy === "task") {
    order = sortTask;
  } else {
    order = sortDefult;
  }

  console.log(order);
  console.log("order", order);
  // const data = await Board.findAll({
  //   where: { userId: id },
  //   include: [
  //     {
  //       model: Card,
  //       include: [
  //         {
  //           model: Task,
  //         },
  //       ],
  //     },
  //   ],
  //   order,
  // });
  // return data;
  const data = await TaskMember.findAll({
    where: { userId },
    include: {
      model: Task,
      include: {
        model: Card,
        include: { model: Board, include: { model: Workspace } },
      },
    },
  });
  return data;
};
