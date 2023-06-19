module.exports = (sequelize, Datatypes) => {
  const Payment = sequelize.define(
    "Payment",
    {
      endAt: {
        type: Datatypes.DATETIME,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Payment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Payment;
};
