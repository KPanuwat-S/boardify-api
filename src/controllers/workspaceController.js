const workspaceService = require("../services/workspace-service");

exports.getAllWorkspaces = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const users = await workspaceService.getWorkspaces(userId);
    console.log(users);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
