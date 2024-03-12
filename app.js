//using express 01
const express = require("express");
const app = express();



//using ejs //for templates
app.set("view engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));


//serving static files // for css and javascript jor our code
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));


//converting url messagae  to object
app.use(express.urlencoded({extended:true}));
//for json format
app.use(express.json());


//for using put, delete, patch request along with get and post request
const methodOverride= require("method-override");
app.use(methodOverride("_method"));


//starting server
const port=8080;
app.listen(8080,()=>{
    console.log(`server is listning on port ${port}`);
});


//000000000015
//require ejs-mate // it helps in creating multiple templates yani layouts ko create krne main //like hm ejs main includes ka use krte theee
const ejsMate = require("ejs-mate"); 
app.engine("ejs",ejsMate);







//using mongoose database // we dont have to remember this code // dont give time for understanding why we used await , async , main() , .then() 
const mongoose=require("mongoose");
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
//for acessing models
const Listing = require("./models/listing.js");








// new server data
// mongoose.connect('mongodb://127.0.0.1:27017/reminder_app', { useNewUrlParser: true, useUnifiedTopology: true });
// const reminderSchema = new mongoose.Schema({
//     reminderTime: Date
// });
// const Reminder = mongoose.model('Reminder', reminderSchema);

// app.get('/cal', (req, res) => {
//     res.render('cal');
// });
// module.exports = Reminder;





// app.post('/setReminder', (req, res) => {
//     const reminderTime = req.body.reminderTime;

//     const newReminder = new Reminder({
//         reminderTime: reminderTime
//     });

//     newReminder.save()
//         .then(() => {
//             console.log('Reminder saved successfully');
//             res.redirect('/cal');
//         })
//         .catch((err) => {
//             console.error(err);
//             res.send('Error saving reminder');
//         });
// });


// setInterval(async () => {
//     const reminders = await Reminder.find();
//     const currentTime = moment();
    
//     reminders.forEach(reminder => {
//         const reminderTime = moment(reminder.reminderTime);
//         if (currentTime.diff(reminderTime, 'hours') === 24) {
//             console.log('Send reminder: 1 day left');
//             // Implement code to send reminder (e.g., email, notification)
//         }
//     });
// }, 60000);
//new server data close


//--------------additional database open

//--------------additional database close






//basic api
// app.get("/",(req,res)=>{
//     res.send("yahhhhhooooo");
// });




//-----------------a
app.get("/home",(req,res)=>{
    res.render("listings/home.ejs");
});


//---------------api for getting all data from listings collection in a particular place
// app.post("/home",async (req,res)=>{
//         let {location} = req.body;  
//     const allListings= await Listing.find({});
//     if(location===allListings){
//         res.render("listings/result.ejs",{allListings});
//     } else{
//         // res.render("listings/result.ejs",{allListings});
//         res.send("NOT FOUND");
//     }
//     });

app.post("/home", async (req, res) => {
    let { title } = req.body;
    
    const allListings = await Listing.find({ title });
    
    if (allListings.length > 0) {
        res.render("listings/result.ejs", { allListings });
    } else {
        res.render("listings/err.ejs");
    }
});




app.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
});



app.get("/listings/:id/book",(req,res)=>{
    res.render("listings/payment.ejs");
});

// km r's code to get one listing by id

// app.get("/home/r",async (req,res)=>{
//     // let { location } = req.params.location;
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs",{allListings});
// });
app.get("/home/r", async (req, res) => {
    const allListings = await Listing.find({ location: "Bhilai" });
    res.render("listings/index.ejs", { allListings });
});

app.get("/home/b", async (req, res) => {
    const allListings = await Listing.find({ location: "Durg" });
    res.render("listings/index.ejs", { allListings });
});

app.get("/home/i", async (req, res) => {
    const allListings = await Listing.find({ location: "Raipur" });
    res.render("listings/index.ejs", { allListings });
});

// app.post("/resf/:id/", async(req,res)=>{
//     let { location } = req.query;
    
//     const allListings = await Listing.find({ location });
    
//     if (allListings.length == 0) {
//         res.render("listings/result.ejs", { allListings });
//     } else {
//         res.send("NOT FOUND");
//     }
// });


    


//     let {location} = req.body;  
//     if(!location){
//         res.send("EVENT NOT AVAILABLE");
//     }
//     else{
//         const listing = await Listing.find({});
//         res.render("listings/result.ejs",{listing});
//     }
// });





//INDEX ROUTE 00000001
app.get("/listings",async (req,res)=>{
    //jo bhi result aayega usko hum ek variable ke ander store krwa lege jiska naam hoga allListings
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
    });


//00000007  //new route always above show route
//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});


//00000008
//CREATE ROUTE
app.post("/listings",async (req,res) => { //ye hoga asnc  function kyu ki hum database ke ander channge krne waale hain
    // let listing =  req.body.listing;
    // //if we wanna parse listing
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // console.log(listing);
//-------------------------------------------------------
//// i used ai here and its working 47. CREATE ROUTE // data is also saving in database and if any error occer it give error also //and also need to do "listing[title]" in new.ejs
    //    const newListing = new Listing ({
//        title:req.body.title, /* req.body is where we access our form data when we use bodyparser middleware */
//        price:req.body.price,
//        image:req.body.image
//    });
//    try{
//       const savedListing = await newListing.save();
//       res.redirect(`/listings/${savedListing._id}`);
//    } catch(err){
//        req.flash('errors', err.message);
//        res.redirect('/listings/new');
//    }
//// ai end
//---------------------------------------------------------
});


//00000000011
//EDIT ROUTE
app.get("/listings/:id/edit",async (req,res)=>{
    //hm id se listing ko nikal rahe hain
    let {id}=req.params;
    //finding listing
    const listing = await Listing.findById(id);
    //after getting listing
    res.render("listings/edit.ejs",{listing});
});


//UPDATE ROUTE //0000000012
app.put("/listings/:id", async (req,res)=>{
    //extracting id
    let{id}=req.params;
    //extracting listing and here we call findByIdAndUpdate //and we pass id and object jiske ke ander hum deconstruct krne waale hain request.body.listing ko basically req.body.listing hamari ek javascript ki object hian jiske anderr saare ke saare parameters hain or hum yaha unhe deconstruct krke unhe individual parameters ke ander convert karegain jisko hum apni nai updated value ke ander pass karegain.
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    //ye show waale prr redirect ho jayega
    res.redirect(`/listings/${id}`);
});


//DELETE ROUTE //000000014
app.delete("/listings/:id", async (req,res)=>{
    //extracting id
    let{id}=req.params;
    //hum findByIdAndDelete ke ander hum id pass krrr rahe hain
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


//0000003 //show route always below every route
//SHOW ROUTE
app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});




//----------------------Hackathon
app.get("/listings/:id/freebook",async (req,res)=>{
    //hm id se listing ko nikal rahe hain
    let {id}=req.params;
    //finding listing
    const listing = await Listing.findById(id);
    //after getting listing
     res.render("listings/freebook.ejs",{listing});
});

app.get("/listings/:id/book",async (req,res)=>{
    //hm id se listing ko nikal rahe hain
    let {id}=req.params;
    //finding listing
    const listing = await Listing.findById(id);
    //after getting listing
     res.render("listings/book.ejs",{listing});
});




//vedio route
app.get("/listings/vedio/:id",async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/vedio.ejs",{listing});
});
//-------------------------close Hackathon







// //testing  routes
// app.get("/testListing", async (req,res)=>{
//     //creating new document //we have created sampleListing
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1500,
//         location: "Calanguate, Goa",
//         country: "India",
//     });
//     //for saving this data in database
//     await sampleListing.save();
//     console.log("Sample was  saved!");  
//     res.send("Sucessfull testing");
// });



