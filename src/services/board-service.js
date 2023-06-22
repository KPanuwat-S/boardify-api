const Board = require("../models");

exports.findAllboard = async () => {
  try {
    const board = await Board.findAll();

    if (board) {
      console.log("User found:", board);
    } else {
      console.log("User not found");
    }
    return board;
  } catch (error) {
    console.error("Error occurred while finding user:", error);
  }
};

exports.createBoard = (board) => Board.create(board);
