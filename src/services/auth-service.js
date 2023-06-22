const { User } = require("../models");

exports.findByEmail = (email) => User.findAll({ where: { email: email } });

exports.createUser = (user) => User.create(user);

exports.checkUserByEmail = (email) => User.findOne({ where: { email: email } });

exports.getUserById = (id) => User.findOne({ where: { id: id } });

exports.findByGoogleId = (googleId) =>
  User.findOne({ where: { googleId: googleId } });
