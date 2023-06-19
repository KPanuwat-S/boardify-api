module.exports = (sequelize, Datatypes) => {
  const Board = sequelize.define(
    "Board",
    {
      name: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Board.hasMany(models.Card, {
      foreignKey: {
        name: "boardId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Board.belongsTo(models.Workspace, {
      foreignKey: {
        name: "workspaceId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Board;
};
