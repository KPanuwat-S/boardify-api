module.exports = (sequelize, Datatype) => {
  const Attachment = sequelize.data(
    "Attachment",
    {
      file: {
        type: Datatype.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  Attachment.associate = (models) => {
    Attachment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Attachment.hasMany(models.Task, {
      foreignKey: {
        name: "attachmentId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })
  };

  return Attachment;
};
