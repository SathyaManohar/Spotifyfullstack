const {v2:cloudinary}=require("cloudinary");
const {albummodelobj}=require("../models/album");


const addalbum=async(req,res)=>{
try{
    const image=req.file;
    const name=req.body.name;
    const imageuploaded=await cloudinary.uploader.upload(image.path,{resource_type:"image"});
    albummodelobj.create({
        name:req.body.name,
        desc:req.body.desc,
        bgcolor:req.body.bgcolor,
        image:imageuploaded.secure_url,


    });
    res.json({success:true,Albumadded:name});
}catch(error){
    res.json({success:false});
}
}

const listalbum=async(req,res)=>{
try{
   const allalbums=await albummodelobj.find();
   res.json({status:"success",message:allalbums});
}catch(error){
    res.json({success:"false"});
}
}

const deletealbum=async(req,res)=>{
    try{
        const idtodelete=req.body.id;
    await albummodelobj.findByIdAndDelete(idtodelete);
    res.json({status:"success",message:"Deleted Album"});

    }catch(error){
        res.json({success:"false"});
    }
}

module.exports={
    addalbum,
    listalbum,
    deletealbum,
}