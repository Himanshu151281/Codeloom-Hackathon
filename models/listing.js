//require mongoose
const mongoose = require("mongoose");
//hme baar baar schema na likhna prre iske liye hum mongoose.schema ko Schema name ke variable ke ander store krr dege or hum seedha Schema ke sath deal krr lee
const Schema = mongoose.Schema;

//creating listing schema // means isme hum define krte hian ki hum kon sa data kis type main lege
//this is schema
const listingSchema = new Schema({
    title:{
        type: String, 
        required: true
    },
    description: String,
    image:{
        type:String,
        //default image
        // hmne 2 logic set kiya hain pahla default logic check krta hain image ya undefined hain yaaa, hain hii nai image exist hi nai krta,
        //basically ye condition uss chheze ke liye hain jb image ka option diya nai jata, orr agr image exist hi nai krti toh testing ke liye hamari saari chizeein work kare uske liye ham isse use krte hain
        //basically  if no image provided by user then this default image will be shown
        default:"https://images.unsplash.com/photo-1708556863286-16a9ada29871?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //2nd dusra set wala logic check krta hian kii image toh hian prr uska link empty hain 2nd yani dusri waali condition hmne client ke liye set kii hain ya hmne user ke liye set kii hain jb hum frontend ke sath kaam krr rahe hoge
        //agr image kii value empty ya null hain toh uski default value "default image link" ho jayegi and agr hmne koi link bheji hain wo image show hogi.
        set: (v)=>
         v === "" 
         ? "https://images.unsplash.com/photo-1708556863286-16a9ada29871?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
         : v,
    },
    price: Number,
    location: String,
    country: String,
});

//using previous schema we create model
//this is model
const Listing = mongoose.model("Listing",listingSchema);
//we are exporting this module so that other file can use it
//so when ever we import this in another file like app.js then we will get the functionality of this file 
module.exports=Listing;  


