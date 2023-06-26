
const { workspaceMember } = require("../models");
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
    const { id } = req.body;

    // const member = await
  } catch (error) {
    next(error);
  }
};
