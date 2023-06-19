module.exports = (sequelize, Datatype) => {
  const Task = sequelize.data(
    "Task",
    {
      name: {
        type: Datatype.STRING,
        allowNull: false,
      },
      position: {
        type: Datatype.INTEGER,
        allowNull: false,
      },
      dueDate: {
        type: Datatype.DATETIME,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  return Task;
};
