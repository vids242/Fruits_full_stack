const express = require("express")
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongoDb");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require("passport");
// const GoogleProvider = require("./utils/Provider");
const FacebookProvider = require("./utils/Provider");

const app = express();
app.use(cookieParser())
app.use(cors())
app.use(express.json())
// app.use(require('express-session')({ secret: 'vuhhuhe', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

connectDB()
// GoogleProvider()
FacebookProvider()


app.use("/api/v1", routes)

app.listen(8000, () => {
    console.log("server started at port 8000");
})




