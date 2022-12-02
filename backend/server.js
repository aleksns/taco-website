require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const ordersRoutes = require("./routes/orders.js");
const userRoutes = require("./routes/user.js");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.use("/api/orders", ordersRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB server and listening on PORT ${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error));
