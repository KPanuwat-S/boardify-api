module.exports = (sequelize, DataTypes) => {
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
