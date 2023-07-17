const myprofileService = require("../services/myprofile-service");
const createError = require("../utils/createError");

exports.getproject = async (req, res, next) => {
  try {
    const { sortBy } = req.query;
    console.log("req.query----", req.query);
    const user = req.user;
    const projectData = await myprofileService.getProject(user.id, sortBy);

    res.status(200).json(projectData);
  } catch (err) {
    next(err);
  }
};
