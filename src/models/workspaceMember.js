module.exports = (sequelize, DataTypes) => {
  const WorkspaceMember = sequelize.define(
    "WorkspaceMember",
    {
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allownNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return WorkspaceMember;
};
