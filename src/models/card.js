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
  return Card;
};
