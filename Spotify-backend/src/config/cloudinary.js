const {v2:cloudinary}=require("cloudinary")

require("dotenv").config();

const connectcloudinary=()=>{
    console.log("Cloudinary Config:", {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
     cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
 
    
}

module.exports={
    connectcloudinary,
}
