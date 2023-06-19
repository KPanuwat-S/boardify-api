module.exports = (sequelize, Datatype) => {
  const Product = sequelize.data(
    "Product",
    {
      name: {
        type: Datatype.STRING,
        allowNull: false,
      },
      duration: {
        type: Datatype.INTEGER,
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
