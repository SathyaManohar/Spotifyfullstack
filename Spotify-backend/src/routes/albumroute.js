const {addalbum,deletealbum,listalbum}=require('../controllers/albumcontroller');

const express=require("express");
const {upload}=require('../middlewares/multer')
const albumrouter=express.Router();


albumrouter.get('/list',listalbum);
albumrouter.post('/add',upload.single('image') ,addalbum);
albumrouter.post('/remove',deletealbum);


module.exports={
    albumrouter,
}



