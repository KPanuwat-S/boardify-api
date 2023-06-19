module.exports = (sequelize, Datatype) => {
  const Label = sequelize.data(
    "Label",
    {
      description: {
        type: Datatype.STRING,
        allowNull: false,
      },
      color: {
        type: Datatype.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Label.associate = (models) => {
    Label.hasMany(models.Task, {
      foreignKey: {
        name: "labelId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Label;
};
