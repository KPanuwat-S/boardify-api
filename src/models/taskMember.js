module.exports = (sequelize, Datatypes) => {
  const TaskMember = sequelize.define(
    "TaskMember",
    {},
    {
      underscored: true,
      paranoid: true,
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
      onDelete: "RESTRICT",
    });
  };

  return TaskMember;
};
