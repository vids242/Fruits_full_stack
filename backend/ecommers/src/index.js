const express = require("express")
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongoDb");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

connectDB()

app.use("/api/v1", routes)

app.listen(8000, () => {
    console.log("server started at port 8000");
})




