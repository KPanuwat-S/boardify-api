const boardService = require("../services/board-service");

exports.createBoard = async (req, res, next) => {
  try {
    const user = req.user;
    console.log("user", user);
    const data = req.body;

    const board = {
      name: data.name,
      userId: user.id,
      workspaceId: data.workspaceId,
    };
    const value = await boardService.createBoard(board);

    res.status(200).json({
      message: "complete",
      payload: value,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllBoardsByWorkspaceId = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const allBaordsInWorkspace = await boardService.getAllBoardsByWorkspaceId(
      workspaceId
    );
    res
      .status(200)
      .json({ message: "complete", payload: allBaordsInWorkspace });
  } catch (err) {
    next(err);
  }
};

exports.editBoardName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { boardName } = req.body;
    const editBoardName = await boardService.editBoardName(id, boardName);
    res.status(200).json({ message: "Update Complete" });
  } catch (err) {
    next(err);
  }
};

exports.getOneBoard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardService.getOneBoard(id);
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
};
