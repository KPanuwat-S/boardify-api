const { User } = require("../models");
const { Op } = require("sequelize");
exports.findByEmail = (email) => User.findAll({ where: { email: email } });

exports.createUser = (user) => User.create(user);

exports.checkUserByEmailAndVerify = (email) =>
  User.findOne({ where: { [Op.and]: [{ email: email }, { isVerify: 1 }] } });

exports.getUserById = (id) => User.findOne({ where: { id: id } });

exports.findByGoogleId = (googleId) =>
  User.findOne({ where: { googleId: googleId } });
