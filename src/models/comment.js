module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      paranoid: true,
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
    });
  };

  return Comment;
};
