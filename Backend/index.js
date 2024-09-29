// Express setup
const express = require("express")
const app = express()

// mongoDB connection
const connectToMongo = require("./db")
connectToMongo()
const multer = require('multer');
const path = require('path');

// cors setup
var cors = require('cors')
app.use(cors())

// json parsing middlewar it should be abovw the routes
app.use(express.json())

// deal with routes setup
const userRoute = require("./routes/User")
const blogRoute = require("./routes/Blog")
const commentRoute = require("./routes/Comment")

// Serve static files from the 'uploads' directory
app.use('/Backend/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/user", userRoute)
app.use("/api/blog", blogRoute)
app.use("/api/comment", commentRoute)

// mention port
let port = 3001;
app.listen(port, ()=>{
    console.log("BlogMania is running on " + port)
})
