const cardService = require("../services/card-service");

exports.getCardsByBoard = async (req, res, next) => {
  try {
    const board = req.params;
    const user = req.user;

    // const WorkspaceAdmin = await cardService.findAdminByWorkSpaceId(board.id);
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

      // const [checkListTotal] = cardsData.map((el) => el.Tasks);

      // const tasksData = el.Cards
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

// data = {
//   userId: 1, //user หมายถึง เจ้าของ workspace เพื่อที่จะเอาชื่อไปตรวจว่าเป็น admin ที่จ่ายเงินไหม ถ้าจ่ายเงินก็จะเปิดให้ใช้ฟีเจอร์ comment
//   baordId: 1,
//   boardName: "board1",
//   members: ["member1", "member2", "member3", "member4"], //member รวมของทั้ง board
//   cards: [
//     {cardID:1,
//     cardName:"cardName",
//     tasks: [
//       {
//         taskId: 1t
//         taskName: "task1",
//         taskDescription: "taskDescription",
//         labelColor: "color",
//         labelDescription:"labelDescription",
//         checkListsTotal: 4,
//         checkListsChecked: 2,
//         dueDate:"2023/6/30",
//         commentsNumber: 3
//         members: [{id:1,name:"stang"},{id:2,name:"stang"},{id:3,name:"stang"}],
//         //member ที่ทำงานแต่ละ task
//         numberOfFilesAttached: 3,

//         },
//   ],
//  }
//  ]
// };
