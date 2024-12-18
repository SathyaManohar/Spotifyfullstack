const express=require("express");

const cors=require("cors");
const {songrouter}=require('./src/routes/songroutes');
const {connectmongodb}=require('./src/config/mongodb');
const {connectcloudinary}=require('./src/config/cloudinary');
const {albumrouter}=require("./src/routes/albumroute");
const dotenv=require("dotenv");
dotenv.config();


const app=express();
const port=process.env.PORT||7000;
connectmongodb().then(()=>console.log("Mongodb connected")).catch((error)=>console.log("error during connnection with mongodb"));
connectcloudinary();

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());//to connect frontend and backend if they are on diff port numbers
app.use('/api/song',songrouter);
app.use('/api/album',albumrouter);



app.get('/',(req,res)=>{
    return res.send("API working fine");
});


app.listen(port,()=>console.log(`Server started at port ${port}`))