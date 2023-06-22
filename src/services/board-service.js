const { Board } = require("../models");

exports.getBoard = (id) => Board.findAll({ where: { userId: id } });

exports.createBoard = (board) => Board.create(board);
