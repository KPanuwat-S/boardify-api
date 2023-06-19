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
  return Product;
};
