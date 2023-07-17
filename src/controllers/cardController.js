const { sequelize } = require("../models");
const cardService = require("../services/card-service");
const createError = require("../utils/createError");
const { v4: uuidv4 } = require("uuid");
exports.getCardsByBoardId = async (req, res, next) => {
  try {
    const board = req.params;
    const cardData = await cardService.findCardsByBoardId(board.id);
    //fetch Data
    const fetchData = cardData.map((el) => {
      const [boardIdData] = el.Boards.map((el) => el.id);
      const [boardNameData] = el.Boards.map((el) => el.name);
      const [membersData] = el.Boards.map((el) => el.BoardMembers);
      const [cardsData] = el.Boards.map((el) => {
        const newCardData = el.Cards.map((el) => {
          taskData = {
            id: el.id,
            name: el.name,
            position: el.position,
            cardType: el.type,
            tasks: el.Tasks.map((el) => {
              return (taskDetailData = {
                taskId: el.id,
                taskName: el.name,
                taskType: el.type,
                taskDescription: el.description,
                taskPosition: el.position,
                labelId: el.Label?.id,
                labelColor: el.Label?.color,
                labelDescription: el.Label?.description,
                taskType: el.type,
                checkListsTotal: el.ChecklistItems?.length,
                checkListsChecked: el.ChecklistItems?.reduce((acc, curr) => {
                  if (curr.isChecked) {
                    return (acc += 1);
                  } else if (!curr.isChecked) {
                    return acc;
                  }
                  return acc;
                }, 0),
                dueDate: el.dueDate,
                members: el.TaskMembers,
                isDone: el.isDone,
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
        cards: cardsData.sort((a, b) => a.position - b.position),
      });
    });

    res.status(200).json(fetchData);
  } catch (error) {
    next(error);
  }
};

exports.getDashBoard = async (req, res, next) => {
  try {
    const board = req.params;

    const checkCard = await cardService.findCardByBoard(board.id);
    const newCardData = checkCard.map((el) => el.id);
    const checkTaskData = await cardService.findTaskByCard(newCardData);
    const newTaskData = checkTaskData.map((el) => el.id);
    const checkTaskMember = await cardService.findTaskMemberById(newTaskData);
    // //memberTask
    const countDataMember = checkTaskMember.reduce((acc, cur) => {
      const idx = acc.findIndex((el) => cur.User.firstName === el.firstName);
      if (idx !== -1) {
        acc[idx].totalTask += 1;
      } else {
        const obj = {
          firstName: cur.User.firstName,
          totalTask: 1,
        };
        acc.push(obj);
      }
      return acc;
    }, []);
    // /label
    const [labelData] = await cardService.findLabel(board.id);
    const descriptionCountMap = {};

    labelData.Cards.forEach((item) => {
      item.Tasks.forEach((task) => {
        const { Label } = task;

        if (Label && Label.description) {
          const { description } = Label;

          if (!descriptionCountMap[description]) {
            descriptionCountMap[description] = {
              description,
              taskTotal: 0,
            };
          }

          descriptionCountMap[description].taskTotal++;
        }
      });
    });

    const result = Object.values(descriptionCountMap);
    const data = {
      taskLabel: result,
      taskMemberData: countDataMember,
    };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.addCard = async (req, res, next) => {
  try {
    //require board_id name position
    const data = req.body;
    console.log("data", req.body);
    const boardId = req.params;
    console.log("params----------------------------", req.params);
    const uuid = uuidv4();
    const newId = uuid + "card";
    let newData;
    if (!data.name) createError("Is require", 400);
    const checkBoardById = await cardService.findBoardById(boardId.id);
    // const checkBoardById = await cardService.findBoardById(boardId);
    if (!checkBoardById) createError("Not Found", 400);
    let [checkPosition] = await cardService.findCardMaxPosition(boardId.id);
    // let [checkPosition] = await cardService.findCardMaxPosition(boardId);
    console.log("check--------------", checkPosition);
    if (!checkPosition) {
      newData = {
        ...data,
        boardId: boardId.id,
        position: 1,
        type: newId,
      };
    } else {
      newData = {
        ...data,
        boardId: boardId.id,
        position: +checkPosition.position + 1,
        type: newId,
      };
    }
    console.log("newData--------------------------------------", newData);
    const cardData = await cardService.createCard(newData);
    res.status(200).json(cardData);
  } catch (error) {
    next(error);
  }
};

exports.updateNameCard = async (req, res, next) => {
  try {
    const boardId = req.params;
    const data = req.body;
    const checkCardById = await cardService.findCardById(
      boardId.id,
      data.cardId
    );
    if (!checkCardById) createError("Not found", 400);
    const cardData = await cardService.updateCardByName(data.name, data.cardId);
    // if (!cardData) createError("try again", 400);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
exports.updateCardDnd = async (req, res, next) => {
  // require (name||type) || position , cardId
  // require source = [index,data] , destination = [index,data] , itemSource = [index,data,taskId] , itemDestination = [index,data,]
  try {
    const cards = req.body;
    const boardId = req.params;
    console.log(boardId);
    if (cards.length <= 0) createError("CardData is required", 400);
    if (!boardId) createError("params is required", 400);
    const cardData = await cards.map((card, idx) => {
      return cardService.updateCardDnd(card, idx, boardId.id);
    });
    if (!cardData) createError("fuck", 400);
    res.status(200).json(boardId);
  } catch (error) {
    next(error);
  }
};
exports.updateTask = async (req, res, next) => {
  try {
    const cards = req.body;
    const boardId = req.params;

    if (cards.length <= 0) createError("CardData is required", 400);
    if (!boardId) createError("params is required", 400);
    const cardData = await Promise.all(
      cards.map(async (card, idx) => {
        await Promise.all(
          card.tasks.map(async (task, index) => {
            await cardService.updateTaskDnd(task, index, card.id);
          })
        );

        return card;
      })
    );
    if (!cardData) createError("try again", 400);
    res.json(cardData);
  } catch (err) {
    next(err);
  }
};

exports.updateCardName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const editCardName = await cardService.updateCardName(id, name);
    res.status(200).json(editCardName);
  } catch (err) {
    next(err);
  }
};

exports.deleteCard = async (req, res, next) => {
  const { id } = req.params;
  await cardService.deleteCardById(id);
  res.status(204).send();
};
