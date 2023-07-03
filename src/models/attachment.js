module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define(
    "Attachment",
    {
      file: {
        type: DataTypes.STRING,
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

    Attachment.hasOne(models.Task, {
      foreignKey: {
        name: "attachmentId",
        allowNull: true,
      },
      onDelete: "CASCADE",
    });
  };

  return Attachment;
};
