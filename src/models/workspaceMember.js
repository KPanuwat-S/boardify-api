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

  WorkspaceMember.associate = (models) => {
    WorkspaceMember.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    WorkspaceMember.belongsTo(models.Workspace, {
      foreignKey: {
        name: "workspaceId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return WorkspaceMember;
};
