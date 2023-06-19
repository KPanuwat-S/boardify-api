module.exports = (sequelize, Datatype) => {
  const Card = sequelize.data(
    "Card",
    {
      name: {
        type: Datatype.STRING,
        allowNull: false,
      },
      position: {
        type: Datatype.INTEGER,
        allowNull: false,
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
      onDelete: "RESTRICT",
    });

    Card.hasMany(models.Task, {
      foreignKey: {
        name: "cardId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Card;
};
