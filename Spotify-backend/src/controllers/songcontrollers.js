const {v2:cloudinary}=require('cloudinary');
const { songmodelobj } = require('../models/song');

const addsong=async(req,res)=>{
try{
const name=req.body.name;
const desc=req.body.desc;
const album=req.body.album;
console.log("NAme",name,"Desc",desc,"album",album);
const audiofile=req.files.audio[0];
const imagefile=req.files.image[0];
console.log("Files received:", req.files);

console.log("Audio File Path:", audiofile.path);
console.log("Image File Path:", imagefile.path);

// const audioupload=await cloudinary.uploader.upload(audiofile.path,{resource_type:"video"});
// const imageupload=await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"});
let audioupload, imageupload;
try {
    audioupload = await cloudinary.uploader.upload(audiofile.path, { resource_type: "video" });
    console.log("Audio Upload Response:", audioupload.secure_url);
} catch (error) {
    console.error("Audio Upload Error:", error);
    

}

try {
     imageupload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
    console.log("Image Upload Response:", imageupload.secure_url);
} catch (error) {
    console.error("Image Upload Error:", error);
    
}



console.log("Audio Upload Response:", audioupload.secure_url);
console.log("Image Upload Response:", imageupload.secure_url);

const duration=`${Math.floor(audioupload.duration/60)}:${Math.floor(audioupload.duration%60)}`;
console.log("duration",duration);
await songmodelobj.create({
    name:name,
    desc:desc,
    album:album,
    image:imageupload.secure_url,
    file:audioupload.secure_url,
    duration:duration,
});
res.status(201).json({status:"success"});
}catch(error){
res.status(404).json({status:"Error"});
}
}

const listsongs=async(req,res)=>{
    try{
        const songs=await songmodelobj.find();
        res.json({success:"true",songs:songs});
    }
    catch(error){
        res.json({success:"false", songs:songs});
    }


}

const deletesong=async(req,res)=>{
try{
    console.log("Body",req.body);
   
const songtodelete=await songmodelobj.findOne({_id:req.body.id});
await songmodelobj.findByIdAndDelete(req.body.id);
console.log("Todelete",songtodelete)
res.status(200).json({success:"true",message:"song removed"});
}catch(error){
res.status(400).json({status:"Error"});
}
}

module.exports={
    addsong,
    listsongs,
    deletesong,
}