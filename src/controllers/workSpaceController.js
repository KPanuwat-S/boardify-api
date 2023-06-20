const workspaceService = require("../services/workspace-service");

exports.getAllBaords = async (req, res, next) => {
  try {
    let user = 1;
    const users = await workspaceService.getBoard(user);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
