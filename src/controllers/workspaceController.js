const workspaceService = require("../services/workspace-service");
const createError = require("../utils/createError");

exports.getAllWorkspaces = async (req, res, next) => {
  try {
    const user = req.user;

    const workspacesData = await workspaceService.getWorkspaces(user.id);

    res.status(200).json(workspacesData);
  } catch (err) {
    next(err);
  }
};
exports.createWorkspaceById = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const result = await workspaceService.createWorkspace(data.name, user.id);
    if (!result) createError("Create error", 400);
    await workspaceService.createMemberByAdminId(result.id, user.id);
    if (data.members.length == 0) return;
    await data.members.map((el) =>
      workspaceService.createMemberByUserId(el.userId, result.id)
    );

    res.status(200).json({ msg: "Create complete" });
  } catch (error) {
    next(error);
  }
};
exports.deleteWorkspaceById = async (req, res, next) => {
  try {
    const workspace = req.params;
    if (!workspace.id) createError("Workspace id is required", 400);
    await workspaceService.deleteWorkspaceById(workspace.id);
    res.status(200).json({ msg: "Delete Complete" });
  } catch (error) {
    next(error);
  }
};
exports.updateWorkspace = async (req, res, next) => {
  try {
    const workspace = req.params;
    const data = req.body;
    if (!workspace.id) createError("Workspace id is required", 400);
    const isCheck = await workspaceService.findWorkspaceById(workspace.id);
    if (!isCheck) createError("Workspace not found", 400);
    await workspaceService.updateWorkspaceById(isCheck.id, data.name);

    res.status(200).json({ msg: "Update complete" });
  } catch (error) {
    next(error);
  }
};
exports.addMemberWorkspaceBy = async (req, res, next) => {
  try {
    res.status(200).json("hi");
  } catch (error) {
    next(error);
  }
};
