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
    },
    {
      underscored: true,
    }
  );

  ChecklistItem.associate = (models) => {
    ChecklistItem.belongsTo(models.Task, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return ChecklistItem;
};
