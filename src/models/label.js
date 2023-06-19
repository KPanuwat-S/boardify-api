module.exports = (sequelize, Datatype) => {
  const Label = sequelize.data(
    "Label",
    {
      description: {
        type: Datatype.STRING,
        allowNull: false,
      },
      color: {
        type: Datatype.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Label;
};
