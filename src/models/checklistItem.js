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
  return ChecklistItem;
};
