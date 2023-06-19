module.exports = (sequelize, Datatypes) => {
  const Attachment = sequelize.define(
    "Attachment",
    {
      file: {
        type: Datatypes.STRING,
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
