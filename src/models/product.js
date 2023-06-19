module.exports = (sequelize, Datatypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      duration: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.Payment, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Product;
};
