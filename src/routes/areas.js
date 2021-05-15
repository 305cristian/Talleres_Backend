const {Router}=require('express');
const router=Router();
const upload =require('../libs/storage_file_area');


const{getArea,getAreas,createArea,editArea,deleteArea}= require('../controllers/areas_controller');


router.route('/')
        .get(getAreas)
        .post(upload.single('image'),createArea);

router.route('/:id')
        .get(getArea)
        .put(upload.single('image'),editArea)
        .delete(deleteArea);


module.exports=router;

