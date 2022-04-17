const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const session = require("express-session");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//set template engine
app.set("view engine", "ejs");

const PORT = 5000;
const DB_URL =
  "mongodb+srv://Kumuthu:omega123@cluster0.ehhq0.mongodb.net/influencer_hub?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log("DB connection error", err));

//import routes
const postRoutes = require("./routes/posts");
app.use(bodyParser.json());
app.use(cors());

app.use(postRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
