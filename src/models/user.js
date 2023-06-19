module.exports = (sequelize, Datatype) => {
  const User = sequelize.data(
    "User",
    {
      firstName: {
        type: Datatype.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Datatype.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: Datatype.STRING,
        allowNull: true,
      },
      email: {
        type: Datatype.STRING,
        allowNull: true,
      },
      isVerify: {
        type: Datatype.BOOLEEN,
        allowNull: false,
        defaultValue: false,
      },
      googleId: {
        type: Datatype.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Payment, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Comment, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Attachment, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Task, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Workspace, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    User.hasMany(models.Board, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return User;
};
