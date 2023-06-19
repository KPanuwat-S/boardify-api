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
  return User
};
