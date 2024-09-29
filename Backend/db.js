const mongoose = require("mongoose")
const mongoURI ="mongodb+srv://Muzdalfa:muzdalfa123@cluster0.iqonb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/BlogMania"

function connectToMongo(){
    mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB Atlas Successfully");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB Atlas:", error);
    });
}

module.exports = connectToMongo