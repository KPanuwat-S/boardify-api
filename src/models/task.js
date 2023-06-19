module.exports = (sequelize, Datatypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      position: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      dueDate: {
        type: Datatypes.DATETIME,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Task.belongsTo(models.Card, {
      foreignKey: {
        name: "cardId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Task.belongsTo(models.Label, {
      foreignKey: {
        name: "labelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Task.belongsTo(models.Attachment, {
      foreignKey: {
        name: "attachmentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Task.belongsTo(models.Comment, {
      foreignKey: {
        name: "commentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Task.hasMany(models.ChecklistItem, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Task;
};
