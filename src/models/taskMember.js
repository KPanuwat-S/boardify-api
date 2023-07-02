module.exports = (sequelize, Datatypes) => {
  const TaskMember = sequelize.define(
    "TaskMember",
    {},
    {
      underscored: true,
    }
  );

  TaskMember.associate = (models) => {
    TaskMember.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    TaskMember.belongsTo(models.Task, {
      foreignKey: {
        name: "taskId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return TaskMember;
};
