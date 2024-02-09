const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const urlRoute = require("./routes/url");
const connectDB = require("./db");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
connectDB(
  "mongodb+srv://abhinilnath10:kuttapanu69@cluster0.nai1wln.mongodb.net/urlShortner"
)
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/url", urlRoute);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}`);
});
