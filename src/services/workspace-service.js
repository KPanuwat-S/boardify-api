const { workSpaceModels } = require("../models");

exports.getBoard = async (id) => {
  const data = await workSpaceModels.find({
    where: { user_id: id },
  });
  return data;
};
