const { WorkspaceMember } = require("../models");
const { User } = require("../models");
const memberService = require("../services/memberService");

exports.searchUser = async (req, res, next) => {
  try {
    const { value } = req.query;
    // console.log("adasd", value);

    const email = await memberService.filterAllUser(value);

    console.log(email);
    res.status(200).json(email);
  } catch (error) {
    next(error);
  }
};

exports.searchAddMember = async (req, res, next) => {
  try {
    const { value } = req.query;
    console.log(value);

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
      if (WorkspaceMember.findOne({ where: { userId: data.id } })) {
        // console.log("ssss", data);
        console.log("It's already have member.");
        return;
      }
      await WorkspaceMember.create({
        workspaceId,
        isAdmin: 0,
        userId: data.id,
      });
    }

    res.status(200).json("Success");
  } catch (error) {
    next(error);
  }
};

exports.getWorkspaceMember = async (req, res, next) => {
  try {
    const workspaceId = req.params;
    console.log("......id", workspaceId);

    const [data] = await WorkspaceMember.findAll({
      where: { workspaceId: workspaceId.id },
      include: { model: User },
    });

    console.log("..... : " , data);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
