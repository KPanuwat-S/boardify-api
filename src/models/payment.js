module.exports = (sequelize, Datatype) => {
  const Payment = sequelize.data(
    "Payment",
    {
      endAt: {
        type: Datatype.DATETIME,
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
