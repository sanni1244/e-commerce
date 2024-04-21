const express = require("express")
const mongoose = require("mongoose")

const app = express()

const username = encodeURIComponent("page");
const password = encodeURIComponent("kkVaFiuU45sVq3K7");


const url = `mongodb+srv://sanniopeyemiolayinka:p8dAs1z9Y39YopPA@comm.n77zpio.mongodb.net/?retryWrites=true&w=majority&appName=comm`

app.listen(4000, ()=> {
    console.log("Connected")
})

mongoose.connect('')