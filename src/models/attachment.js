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
  return Attachment;
};
