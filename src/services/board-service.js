const Board = require("../models");

exports.createBoard = (board) => Board.create(board);
