const stripe = require("stripe")(process.env.STRIPE_KEY);
const { sequelize } = require("../models");
const createError = require("../utils/createError");

const { Payment, User } = require("../models");

exports.checkout = async (req, res) => {
  console.log("ssss", req.body);
  const item = {
    price: req.body.priceId,
    quantity: 1,
  };

  const checkout = await stripe.checkout.sessions.create({
    line_items: [item],
    mode: "payment",
    payment_method_types: ["promptpay", "card"],
    success_url:
      "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}", // จ่ายสำเร็จ
    cancel_url: "http://localhost:5173/purchase", // ยกเลิกการจ่ายเงิน
  });

  res.json(checkout);
};

exports.payment = async (req, res, next) => {
    const t = await sequelize.transaction();
  try {
    const user = req.user;
    console.log("user :", user);


    const time = new Date()

    //   const id = User.findByPk(user.id);
    const checkUser = await User.findOne({
      where: { id: user.id },
      transaction: t,
    });

    if (!checkUser) {
      createError("error -------", 400);
    }

    const data = req.query;
    console.log("payment :", data);
    const response = {};
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    //   console.log("________1", session);
    if (session) {
      response.session = session;
    }

    await Payment.create(
      {
        endAt: +time + (1000 * 60 * 60 * 24 * 30),
        productId: 1,
        userId: user.id,
      },
      { transaction: t }
    );

    await t.commit();
    // //   console.log("_______aa", req.query);

    return res.json({
      message: "success",
      ...response,
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};
