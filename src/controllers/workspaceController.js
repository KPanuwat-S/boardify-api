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

exports.getAllMemberInWorkspace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const members = await workspaceService.getAllMemberInWorkspace(workspaceId);
    res.status(200).json({ members });
  } catch (err) {
    next(err);
  }
};

exports.getWorkspaceById = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await workspaceService.getWorkspaceById(workspaceId);
    res.status(200).json({ workspace });
  } catch (err) {
    next(err);
  }
};
