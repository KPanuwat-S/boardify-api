module.exports = (sequelize, Datatype) => {
  const Board = sequelize.data(
    "Board",
    {
      name: {
        type: Datatype.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Board;
};
