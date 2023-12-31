const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// ==================================================================
const errorHandler = require("./middlewares/errorHandler");

const authRouter = require("./routes/routers/auth");
const userRouter = require("./routes/routers/user");
const productRouter = require("./routes/routers/product");

const { session } = require("./middlewares/session");

// ==================================================================
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(helmet());

app.use(session);
app.use(authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.use(errorHandler);

app.listen(8000, () => console.log("localhost:8000"));
