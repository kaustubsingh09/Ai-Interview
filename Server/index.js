const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./Model/userModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
dotenv.config({ path: "./.env" });
app.use(cors());

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    msg: {
      id: "1",
      title: "hello from server hello",
    },
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });
    const token = signToken(user._id);
    res.status(201).json({
      status: "Success",
      msg: "Account Created Successfully! Now login to continue..",
      token: token,
      user,
    });
  } catch (err) {
    res.status(400).json({
      errorMsg: "Email already exists",
      err: err,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({
        msg: "Enter email & password",
      });
    }

    const user = await User.findOne({ email });
    const token = signToken(user._id);

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        msg: "incorrect email or password",
      });
    }
    res.status(200).json({
      status: "Success",
      user: user,
      token: token,
    });
  } catch (err) {
    res.send(err);
  }
});

const connectDb = async () => {
  await mongoose
    .connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Atlas DB Connection Successfull"))
    .catch((err) => console.log(err));
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/prompt", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}:`,
      temperature: 0.5,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (response.data.choices[0].text) {
      return res.json({
        message: response.data.choices[0].text,
      });
    }
  } catch (err) {
    res.send(err);
  }
});

connectDb();

app.listen(process.env.PORT, () => {
  console.log("Server Listening");
});
