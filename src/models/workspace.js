module.exports = (sequelize, DataTypes) => {
  const Workspace = sequelize.define(
    "Workspace",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Workspace.associate = (models) => {
    Workspace.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Workspace.hasMany(models.Board, {
      foreignKey: {
        name: "workspaceId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Workspace.hasMany(models.WorkspaceMember, {
      foreignKey: {
        name: "workspaceId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Workspace;
};
