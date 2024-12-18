const mongoose=require("mongoose");

const connectmongodb=async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}`);
}

module.exports={
    connectmongodb,
}