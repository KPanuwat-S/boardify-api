const { WorkspaceMember, Board, Workspace } = require("../models");

exports.getWorkspaces = async (id) => {
  const data = await WorkspaceMember.findAll({
    where: { userId: id },
    include: [{ model: Workspace, include: { model: Board } }],
  });

  // expected {user:, workspaces:[workspace: {id}],}
  return data;
};
