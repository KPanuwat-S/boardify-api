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
            id: el.id,
            name: el.name,
            position: el.position,
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
    console.log("data", data);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.addCard = async (req, res, next) => {
  try {
    //require board_id name position
    const data = req.body;

    if (!data.name || data.position === undefined)
      createError("Is require", 400);
    console.log("req params", req.params);
    const { id } = req.params;
    console.log("id", id);
    const checkBoardById = await cardService.findBoardById(id);
    console.log("checkboard", checkBoardById);
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
  //require cardId
  try {
    const cardId = req.params;
    if (!cardId) createError("CardId is require");
    const deleteData = await cardService.deleteCardById(cardId);
    if (deleteData) {
      return res.status(200).json({ msg: "Delete is Complete" });
    } else {
      return res.status(200).json({ msg: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.test = async (req, res, next) => {
  try {
    res.json(req.body);
  } catch (error) {
    next(error);
  }
};
