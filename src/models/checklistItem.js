module.exports = (sequelize, DataTypes) => {
  const ChecklistItem = sequelize.define(
    "ChecklistItem",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isChecked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      }
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  ChecklistItem.associate = (models) => {
    ChecklistItem.belongsTo(models.Task, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ChecklistItem;
};
