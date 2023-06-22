const { Board } = require("../models");

exports.getBoard = (id) => Board.findOne({ where: { id: id } });

exports.createBoard = (board) => Board.create(board);
