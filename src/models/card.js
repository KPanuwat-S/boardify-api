const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const v4options = {
    random: [
      0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1,
      0x67, 0x1c, 0x58, 0x36,
    ],
  };
  const Card = sequelize.define(
    "Card",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );

  Card.associate = (models) => {
    Card.belongsTo(models.Board, {
      foreignKey: {
        name: "boardId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Card.hasMany(models.Task, {
      foreignKey: {
        name: "cardId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Card;
};
