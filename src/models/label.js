module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define(
    "Label",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Label.associate = (models) => {
    Label.hasMany(models.Task, {
      foreignKey: {
        name: "labelId",
        allowNull: true,
      },
      onDelete: "RESTRICT",
    });
  };

  return Label;
};
