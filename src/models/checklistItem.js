module.exports = (sequelize, Datatypes) => {
  const ChecklistItem = sequelize.define(
    "ChecklistItem",
    {
      description: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      isChecked: {
        type: Datatypes.BOOLEEN,
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
