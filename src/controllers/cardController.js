const cardService = require("../services/card-service");

exports.getCardsByBoard = async (req, res, next) => {
  try {
    const board = req.params;
    const user = req.user;

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
