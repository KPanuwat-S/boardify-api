const { sequelize } = require("../models");
const cardService = require("../services/card-service");
const createError = require("../utils/createError");

exports.getCardsByBoardId = async (req, res, next) => {
  try {
    const board = req.params;
    const cardData = await cardService.findCardsByBoardId(board.id);
    const fetchData = cardData.map((el) => {
      const [boardIdData] = el.Boards.map((el) => el.id);
      const [boardNameData] = el.Boards.map((el) => el.name);
      const [membersData] = el.Boards.map((el) => el.BoardMembers);
      const [cardsData] = el.Boards.map((el) => {
        const newCardData = el.Cards.map((el) => {
          taskData = {
            cardID: el.id,
            cardName: el.name,
            cardPosition: el.position,
            tasks: el.Tasks.map((el) => {
              return (taskDetailData = {
                taskId: el.id,
                taskName: el.name,
                taskDescription: el.description,
                taskPosition: el.position,
                labelColor: el.Label.color,
                labelDescription: el.Label.description,
                checkListsTotal: el.ChecklistItems.length,
                checkListsChecked: el.ChecklistItems.reduce((acc, curr) => {
                  if (curr.isChecked) {
                    return (acc += 1);
                  } else if (!curr.isChecked) {
                    return acc;
                  }
                  return acc;
                }, 0),
                dueDate: el.dueDate,
                commentsNumber: el.Comment,
                // .reduce((acc, curr) => {
                //   return (acc += 1);
                // }, 0),
                members: el.TaskMembers,
                numberOfFilesAttached: el.Attachment,
              });
            }),
          };
          taskData.tasks.sort((a, b) => a.taskPosition - b.taskPosition);
          return taskData;
        });
        return newCardData;
      });
      return (allData = {
        userId: el.userId,
        boardId: boardIdData,
        boardName: boardNameData,
        members: membersData,
        cards: cardsData.sort((a, b) => a.cardPosition - b.cardPosition),
      });
    });

    const [data] = fetchData;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.addCard = async (req, res, next) => {
  try {
    //require board_id name position
    const data = req.body;
    if (!data.name || !data.position) createError("Is require", 400);
    const { id } = req.params;
    const checkBoardById = await cardService.findBoardById(id);
    if (!checkBoardById) createError("Not Found", 400);
    const newData = { ...data, boardId: id };
    const cardData = await cardService.createCard(newData);
    res.status(200).json(cardData);
  } catch (error) {
    next(error);
  }
};

exports.updateNameCard = async (req, res, next) => {
  // require (name||type) || position , cardId
  // require source = [index,data] , destination = [index,data] , itemSource = [index,data,taskId] , itemDestination = [index,data,]
  try {
    const data = req.body;
    console.log(data);
    const checkCardById = await cardService.findCardById(
      data.boardId,
      data.cardId
    );
    if (!checkCardById) createError("Not found", 400);
    const cardData = await cardService.updateCard(
      checkCardById.Cards[0],
      data.name,
      data.position
    );
    if (!cardData) createError("try again", 400);
    res.json(cardData);
  } catch (error) {
    next(error);
  }
};

exports.deleteCard = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const cardId = req.params;
    if (!cardId) createError("CardId is require");
    const [allData] = await cardService.findTaskByCardId(cardId.id);
    if (!allData) createError("Not found", 400);
    // if (allData.Comments.length > 0) {
    //   for (const data of allData.Comments) {
    //     const resComments = await cardService.deleteComments(data.id, t));
    //   }
    //   if (!resComments) createError("TasksMember delete fail", 400);
    // }
    if (allData.Attachment) {
      const resAttachment = await cardService.deleteAttachment(
        allData.Attachment.id,
        t
      );
      if (!resAttachment) createError("Attachment delete fail", 400);
    }
    if (allData.TaskMembers.length > 0) {
      for (const data of allData.TaskMembers) {
        const resTasksMember = await cardService.deleteTaskMembers(data.id, t);
        if (!resTasksMember) createError("TasksMember delete fail", 400);
      }
    }
    if (allData.id) {
      const taskData = await cardService.deleteTaskById(allData.id, t);
      if (!taskData) createError("Task delete fail", 400);
    }
    const resCard = await cardService.deleteCardById(cardId.id, t);
    if (!resCard) createError("Card delete fail", 400);
    await t.commit();
    res.status(200).json({ msg: "Delete Complete" });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
