module.exports = (sequelize, Datatypes) => {
  const BoardMember = sequelize.define("BoardMember",{}, {
    underscored: true,
    paranoid: true,
  });

  BoardMember.associate = (models) => {
    BoardMember.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    BoardMember.belongsTo(models.Board, {
      foreignKey: {
        name: "boardId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return BoardMember;
};
