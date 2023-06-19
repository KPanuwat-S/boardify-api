module.exports = (sequelize, Datatypes) => {
  const Label = sequelize.define(
    "Label",
    {
      description: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      color: {
        type: Datatypes.STRING,
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
