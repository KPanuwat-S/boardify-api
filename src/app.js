require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const boardsRoute = require("./routes/boardsRoute");
const workSpaceRoute = require("./routes/workSpaceRoute");
const authRoute = require("./routes/authRoute");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 1000,
    message: {
      message: "too many request",
    },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use(boardsRoute);
// app.use("/", res.send({ message: "Hi Boardify" }));
app.use(workSpaceRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
