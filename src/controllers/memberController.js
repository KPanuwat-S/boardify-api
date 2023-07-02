const {
  WorkspaceMember,
  Board,
  User,
  BoardMember,
  Workspace,
} = require("../models");
const memberService = require("../services/memberService");
const createError = require("../utils/createError");

exports.searchUser = async (req, res, next) => {
  try {
    const { value } = req.query;
    // console.log("adasd", value);

    const email = await memberService.filterAllUser(value);

    // console.log(email);
    res.status(200).json(email);
  } catch (error) {
    next(error);
  }
};

exports.searchAddMember = async (req, res, next) => {
  try {
    const { value } = req.query;
    // console.log(value);

    const member = await memberService.filterMember(value);

    // console.log("qqqq", member);
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const { workspaceId, memberAll } = req.body;
    console.log("addMember value: ", workspaceId, memberAll);

    for (const data of memberAll) {
      if (await WorkspaceMember.findOne({ where: { userId: data.id } })) {
        // console.log("ssss", data);
        // console.log(data.id);
        console.log("It's already have member.");
        return;
      }
      await WorkspaceMember.create({
        workspaceId,
        isAdmin: 0,
        userId: data.id,
      });
    }

    console.log("Success");
    res.status(200).json("Success");
  } catch (error) {
    next(error);
  }
};

exports.getWorkspaceMember = async (req, res, next) => {
  try {
    const workspaceId = req.params;
    // console.log("......id", workspaceId);

    const data = await WorkspaceMember.findAll({
      where: { workspaceId: workspaceId.id },
      include: { model: User },
    });

    const count = await Promise.all(
      data.map((el) =>
        BoardMember.count({
          include: { model: Board },
          where: { userId: el.userId },
        })
      )
    );

    const newData = data.map((el, index) => ({
      ...el.toJSON(), // Convert the Sequelize instance to a plain JavaScript object
      count: count[index], // Add the corresponding count value
    }));

    // console.log(newData);

    res.status(200).json(newData);
  } catch (error) {
    next(error);
  }
};

exports.deleteWorkspaceMember = async (req, res, next) => {
  try {
    const id = req.query;

    if (id.userId == BoardMember.userId) {
      await BoardMember.destroy({
        include: { model: Board },
        where: { userId: id.userId },
      });
    }

    await WorkspaceMember.destroy({
      include: { model: Workspace },
      where: { userId: id.userId },
    });

    console.log(id);
    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
};
