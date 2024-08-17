require('dotenv').config()

const express = require("express")
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongoDb");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require("passport");
const { GoogleProvider, FacebookProvider } = require("./utils/Provider");
const connectChat = require("./utils/soketIO");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./src/api.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(require('express-session')({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true,cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
connectDB()
GoogleProvider()
FacebookProvider()
connectChat()

app.use("/api/v1", routes)

app.listen(8000, () => {
    console.log("server started at port 8000");
})




