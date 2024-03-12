//using mongoose database // we dont have to remember this code // dont give time for understanding why we used await , async , main() , .then() 
const mongoose = require("mongoose");
//for connecting with database // and below we have created database for our website of name wanderlust
const MONGO_URL= "mongodb://127.0.0.1:27017/hackathon";
//passing variable
async function main(){
    await mongoose.connect(MONGO_URL);
};
main()
    .then(()=>{
        console.log("connected to the database");
    })
    .catch((err)=>{
        console.error(err);
    });


//require data
const initData = require("./data.js");


//require models
const Listing = require("../models/listing.js");


//we make a function of name initDB of async  type 
const initDB = async ()=>{
    //if we have random data in database then we can clean it by 
    await Listing.deleteMany({});
    //now we insert our data
    //we used .data because in data.js we are exporting data into key of name data
    await Listing.insertMany(initData.data);
    console.log("Data Was Initialized");
};
//calling initDB function
initDB();
