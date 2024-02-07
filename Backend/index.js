const express = require("express");
const app = express();
const port = 4000;
const urlRoute = require("./routes/url");
const connectDB = require("./db");

connectDB(
  "mongodb+srv://abhinilnath10:kuttapanu69@cluster0.nai1wln.mongodb.net/urlShortner"
)
  .then(() => {
    console.log("MONGO DB connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(express.json());

app.use("/url", urlRoute);

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}`);
});
