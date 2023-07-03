const { sequelize } = require("../models");
const workspaceService = require("../services/workspace-service");
const createError = require("../utils/createError");
const { WorkspaceMember } = require("../models");

exports.getAllWorkspaces = async (req, res, next) => {
  try {
    const user = req.user;
    const workspacesData = await workspaceService.getWorkspaces(user.id);
    console.log("get all workspace");

    

    res.status(200).json(workspacesData);
  } catch (err) {
    next(err);
  }
};

exports.getOneWorkSpace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    const workspaceData = await workspaceService.getWorkspaceById(workspaceId);
    res.status(200).json(workspaceData);
  } catch (err) {
    next(err);
  }
};

exports.createWorkspaceById = async (req, res, next) => {
  // const t = await sequelize.transaction();
  try {
    const user = req.user;
    const data = req.body;
    const result = await workspaceService.createWorkspace(data.name, user.id);
    console.log("result", result);
    console.log("user", user);
    console.log("data", data);
    if (!result) createError("Create error", 400);
    // await workspaceService.createMemberByAdminId(result.id, user.id, t);
    await workspaceService.createMemberByAdminId(result.id, user.id);

    // await t.commit();
    if (data.members.length > 0) {
      await data.members.map((el) =>
        workspaceService.createMemberByUserId(el.userId, result.id)
      );
    } else res.status(200).json({ msg: "Create Workspace Complete" });
    res.status(200).json(result);
  } catch (error) {
    // await t.rollback();
    next(error);
  }
};

exports.deleteWorkspaceById = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = req.user;
    const workspace = req.params;
    if (!workspace.id) createError("Workspace id is required", 400);
    const isAdmin = await workspaceService.findAdminById(workspace.id, user.id);
    if (!isAdmin) createError("Unauthorized", 400);
    const deleteMember = await workspaceService.deleteMemberWorkspaceById(
      workspace.id,
      t
    );
    if (!deleteMember) createError("Delete fail", 400);
    await workspaceService.deleteWorkspaceById(workspace.id, t);
    await t.commit();
    res.status(200).json({ msg: "Delete Complete" });
  } catch (error) {
    await t.rollback();
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
exports.addMemberWorkspaceById = async (req, res, next) => {
  try {
    res.status(200).json("hi");
  } catch (error) {
    next(error);
  }
};

exports.getAllMembersInWorkspace = async (req, res, next) => {
  try {
    const { workspaceId } = req.params;
    console.log("workspace id", workspaceId);
    const members = await workspaceService.getAllMembersInWorkspace(
      workspaceId
    );

    const countMember = await WorkspaceMember.count({
      where: { workspaceId: workspaceId },
    });

    // const newData = [...members, countMember]
    const newData = members.map((el, idx) => ({
      ...el,
      count: countMember,
    }));

    console.log(newData);

    res.status(200).json(newData);
  } catch (err) {
    next(err);
  }
};

// exports.getAllMembersInWorkspace = async (req, res, next) => {
//   try {
//     const { workspaceId } = req.params;
//     console.log("workspace id", workspaceId);
//     const members = await workspaceService.getAllMembersInWorkspace(
//       workspaceId
//     );
//     res.status(200).json({ members });
//   } catch (err) {
//     next(err);
//   }
// };

exports.countMemberWorkspace = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const countMember = await WorkspaceMember.count({where: { [Op.and] : [{workspaceId: id}, {}]}})
    const countMember = await WorkspaceMember.count({
      where: { workspaceId: id },
    });
    // console.log(countMember);

    // console.log("------count------ : ", id);
    res.status(200).json(countMember);
  } catch (error) {
    next(error);
  }
};
