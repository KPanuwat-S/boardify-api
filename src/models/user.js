module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Datatypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      email: {
        type: Datatypes.STRING,
        allowNull: true,
      },
      isVerify: {
        type: Datatypes.BOOLEEN,
        allowNull: false,
        defaultValue: false,
      },
      googleId: {
        type: Datatypes.STRING,
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
