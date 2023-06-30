const { Op } = require("sequelize");

const { User } = require("../models");

exports.filterAllUser = (value) =>
  User.findAll({
    where: { email: { [Op.startsWith]: value }, isVerify: true },
  });

exports.filterMember = (value) =>
  User.findAll({
    where: { email: value },
  });
