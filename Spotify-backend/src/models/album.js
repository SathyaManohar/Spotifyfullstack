const mongoose=require('mongoose');

const albumschema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
desc:{
    type:String,
    required:true
},
bgcolor:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
}

});

const albummodelobj=mongoose.model('album',albumschema);

module.exports={
    albummodelobj,
}