const {addsong,listsongs,deletesong}=require('../controllers/songcontrollers');

const express=require("express");
const {upload}=require('../middlewares/multer')

const songrouter=express.Router();

songrouter.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),addsong);

songrouter.get('/list',listsongs);

songrouter.post('/remove',deletesong);

module.exports={
    songrouter,
}
