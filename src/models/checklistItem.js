module.exports = (sequelize, Datatype) => {
  const ChecklistItem = sequelize.data(
    "ChecklistItem",
    {
      description: {
        type: Datatype.STRING,
        allowNull: true,
      },
      isChecked: {
        type: Datatype.BOOLEEN,
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
      onDelete: "RESTRICT",
    });
  };

  return ChecklistItem;
};
