module.exports = (sequelize, Datatypes) => {
  const Workspace = sequelize.define(
    "Workspace",
    {
      name: {
        type: Datatypes.STRING,
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
