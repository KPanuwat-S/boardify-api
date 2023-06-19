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
  return Comment;
};
