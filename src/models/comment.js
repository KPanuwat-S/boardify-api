module.exports = (sequelize, Datatype) => {
  const Comment = sequelize.data(
    "Comment",
    {
      comment: {
        type: Datatype.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  Comment.associate = (models) => {
    Comment.hasMany(models.Task, {
      foreignKey: {
        name: "commentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })
  }

  return Comment;
};
