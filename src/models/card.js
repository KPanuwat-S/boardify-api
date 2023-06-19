module.exports = (sequelize, Datatypes) => {
  const Card = sequelize.define(
    "Card",
    {
      name: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      position: {
        type: Datatypes.INTEGER,
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
