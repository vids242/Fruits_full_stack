require('dotenv').config()

const express = require("express")
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongoDb");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require("passport");
const { GoogleProvider, FacebookProvider } = require("./utils/Provider");
const connectChat = require("./utils/soketIO");

const app = express();
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(require('express-session')({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectDB()
GoogleProvider()
FacebookProvider()
connectChat()

app.use("/api/v1", routes)

app.listen(8000, () => {
    console.log("server started at port 8000");
})




