const cardService = require("../services/card-service");

exports.getCardsByBoardId = async (req, res, next) => {
  try {
    const board = req.params;
    const user = req.user;

    // const WorkspaceAdmin = await cardService.findAdminByWorkSpaceId(board.id);
    const cardData = await cardService.findCardsByBoardId(board.id);
    // console.log(cardData[0]);
    // const boardMemberData = await cardService
    res.send(cardData);
  } catch (error) {
    next(error);
  }
};
