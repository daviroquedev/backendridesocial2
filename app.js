require("dotenv").config()
const express = require("express")
const path = require("path")
const cors = require("cors")
const port = process.env.PORT;
const bodyParser = require("body-parser")

const app = express()

//config json and form data response

app.use(bodyParser.json({limit:'12mb'}))
// app.use(bodyParser.urlencoded({limit:'12mb',extended:false}))

// solve CORS
app.use(cors({credentials: true, origin: "http://127.0.0.1:5173"}))

//upload directory
app.use("/uploads", express.static(path.join(__dirname,"/uploads")))

//DB connection
require("./config/db.js")

//routes 
const router = require("./routes/Router");

app.use(router)

app.listen( ()=>{
    console.log(`app rodando na porta `)
})