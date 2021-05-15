const {Router}=require('express');
const router= Router();

const upload =require('../libs/storage_file_user');

const{getUser, getUsers, createUser, updateUser, deleteUser}=require('../controllers/users_controller');

router.route('/')
        .get(getUsers)
        .post(upload.single('image'),createUser);
router.route('/:id')
        .get(getUser)
        .put(upload.single('image'), updateUser)
        .delete(deleteUser);
        

module.exports=router;

