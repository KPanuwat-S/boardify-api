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
      onDelete: "RESTRICT",
    })
  };

  return Workspace;
};
