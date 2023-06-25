const { WorkspaceMember } = require("../models");

exports.getWorkspaces = async (id) => {
  const data = await WorkspaceMember.findOne({
    where: { userId: id },
  });
  console.log(data);
  return data;
};
