const {Router} = require('express');
const router = Router();


const upload =require('../libs/storage_file');
const {getTalleres,  getTaller, editTaller, deleteTaller, createTaller, getTalleres_area, getTaller_x_area} = require('../controllers/talleres_controller');

let cpUpload = upload.fields([{name: 'video'}, { name: 'image'}])
    
router.route('/')
        .get(getTalleres)
        .post(cpUpload,createTaller)
//        .post(upload.single('image'),createTaller);

router.route('/:id')
        .delete(deleteTaller)
        .put(cpUpload,editTaller)
//        .put(upload.single('image'),editTaller)
        .get(getTaller);

router.route('/:id_area/:id').get(getTaller_x_area)



module.exports = router;

