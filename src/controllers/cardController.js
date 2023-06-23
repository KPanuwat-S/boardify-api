const cardService = require("../services/card-service");
const createError = require("../utils/createError");

exports.getCardsByBoard = async (req, res, next) => {
  try {
    const board = req.params;
    const cardData = await cardService.findCardsByBoardId(board.id);
    const fetchData = cardData.map((el) => {
      const [boardIdData] = el.Boards.map((el) => el.id);
      const [boardNameData] = el.Boards.map((el) => el.name);
      const [membersData] = el.Boards.map((el) => el.BoardMembers);
      const [cardsData] = el.Boards.map((el) => {
        const newCardData = el.Cards.map((el) => {
          return (taskData = {
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
                  if (curr.isChecked == 1) {
                    return (acc += 1);
                  }
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
          });
        });
        return newCardData;
      });
      return (allData = {
        userId: el.userId,
        boardId: boardIdData,
        boardName: boardNameData,
        members: membersData,
        cards: cardsData,
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
    if (!data.name || !data.position) createError("error", 400);
    const { id } = req.params;
    const checkBoardById = await cardService.findBoardById(id);
    if (!checkBoardById) createError("error", 400);
    const newData = { ...data, boardId: id };
    const cardData = await cardService.createCard(newData);
    res.status(200).json(cardData);
  } catch (error) {
    next(error);
  }
};

exports.updateNameCard = async (req, res, next) => {
  // require (name||type) || position , cardId

  try {
    const boardId = req.params;
    const data = req.body;
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
