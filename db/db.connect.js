const mongoose=require("mongoose");
require("dotenv").config();

const mongo = process.env.Mongo_Url;

const initilizatiom=async()=>{
    await mongoose.connect(mongo)
    .then(()=>{
        console.log("Connect the  database")
    }).catch((error)=>{
        console.log("Error connect to databse",error)
    })
}

module.exports = {initilizatiom};