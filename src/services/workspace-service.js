const { WorkspaceMember, Board, Workspace, User } = require("../models");
const { Op } = require("sequelize");
exports.getWorkspaces = async (id) => {
  const data = await WorkspaceMember.findAll({
    where: { userId: id },
    include: [{ model: Workspace, include: { model: Board } }],
  });

  const countMember = await Promise.all(data.map( async (el, idx) => {
    const id = el.workspaceId
    const countMember = await WorkspaceMember.count({
      where: { workspaceId: id }
    });

    return countMember
  })
)
  console.log("-------- count : ",countMember);

  const newData = data.map((el, index) => ({
    ...el.toJSON(),
    count: countMember[index],
  }));

  console.log(newData);

  return newData;
};

exports.createWorkspace = (name, userId) => Workspace.create({ userId, name });
exports.createMemberByAdminId = (workspaceId, userId) =>
  WorkspaceMember.create({ userId, workspaceId, isAdmin: 1 });
exports.createMemberByUserId = (userId, workspaceId) =>
  WorkspaceMember.create({ userId, workspaceId, isAdmin: 0 });

exports.findMemberById = (workspaceId, userId) =>
  WorkspaceMember.findAll({
    where: { [Op.and]: [{ workspaceId }, { userId }] },
    include: {
      model: Workspace,
      where: { [Op.and]: [{ id: workspaceId }, { userId }] },
    },
  });

exports.findAdminById = (workspaceId, userId) =>
  Workspace.findOne({
    where: { [Op.and]: [{ id: workspaceId }, { userId }] },
  });
exports.deleteMemberWorkspaceById = (workspaceId, t) =>
  WorkspaceMember.destroy({ where: { workspaceId }, transaction: t });

exports.deleteWorkspaceById = (id, t) =>
  Workspace.destroy({ where: { id }, transaction: t });
/////////update

exports.createMemberByAdminId = (workspaceId, userId) =>
  WorkspaceMember.create({ userId, workspaceId, isAdmin: 1 });
exports.createMemberByUserId = (userId, workspaceId) =>
  WorkspaceMember.create({ userId, workspaceId, isAdmin: 0 });
exports.deleteWorkspaceById = (id) => Workspace.destroy({ where: { id } });
exports.findWorkspaceById = (id) => Workspace.findOne({ where: { id } });
exports.updateWorkspaceById = (id, name) =>
  Workspace.update({ name }, { where: { id } });

exports.getAllMembersInWorkspace = async (workspaceId) => {
  const data = await WorkspaceMember.findAll({
    where: { id: workspaceId },
    include: [{ model: User, attributes: ["firstName", "lastName", "email"] }],
  });
  const users = data.map((el) => {
    const user = {
      userId: el.userId,
      firstName: el.User.firstName,
      lastName: el.User.lastName,
      email: el.User.email,
      isAdmin: el.isAdmin,
    };
    return user;
  });
  return users;
};

exports.getWorkspaceById = async (workspaceId) => {
  const data = await Workspace.findOne({
    where: { id: workspaceId },
  });

  return data;
};

