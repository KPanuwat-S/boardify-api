require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const notFoundMiddleware = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
// const boardsRoute = require("./route/boardsRoute");
const authRoute = require("./routes/authRoute");
const boardsRoute = require("./routes/boardsRoute");
const workspaceRoute = require("./routes/workspaceRoute");
const authenticate = require("./middlewares/authenticate");
const memberRoute = require("./routes/memberRoute");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  rateLimit({
    windowMs: 60 * 1000 * 15,
    max: 10000,
    message: {
      message: "too many request",
    },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/workspaces", authenticate, workspaceRoute);
app.use("/boards", authenticate, boardsRoute);
app.use("/member", memberRoute);

// app.use("/", res.send({ message: "Hi Boardify" }));

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
