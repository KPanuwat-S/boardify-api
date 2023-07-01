module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
      }
    },
    {
      underscored: true,
      paranoid: true,
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
      onDelete: "CASCADE",
    });

    Task.belongsTo(models.Label, {
      foreignKey: {
        name: "labelId",
        allowNull: true,
      },
      onDelete: "CASCADE",
    });

    Task.belongsTo(models.Attachment, {
      foreignKey: {
        name: "attachmentId",
        allowNull: true,
      },
      onDelete: "CASCADE",
    });

    Task.hasMany(models.Comment, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Task.hasMany(models.ChecklistItem, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });

    Task.hasMany(models.TaskMember, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Task;
};
