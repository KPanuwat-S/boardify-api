module.exports = (sequelize, Datatype) => {
  const Workspace = sequelize.data(
    "Workspace",
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
  return Workspace;
};