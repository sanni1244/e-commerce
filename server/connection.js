
const { MongoClient, ServerApiVersion } = require('mongodb');

const mail = "page"
const password = "kkVaFiuU45sVq3K7";
const encodedPassword = encodeURIComponent(password);
const mailC = encodeURIComponent(mail);


const uri = `mongodb+srv://${mailC}:${encodedPassword}@commerce.3tauo8k.mongodb.net/?retryWrites=true&w=majority&appName=commerce`;


const dbName = 'deals';


const client = new MongoClient(uri);
  
  module.exports = {
    client,
    dbName
  };