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
  return Payment;
};
