const {Router}=require('express');
const router= Router();

const upload =require('../libs/storage_file_user');

const{getUser,getUser_ci, getUsers, createUser, updateUser, deleteUser, login_session}=require('../controllers/users_controller');

router.route('/')
        .get(getUsers)
        .post(upload.single('image'),createUser);
router.route('/:id')
        .get(getUser)
        .put(upload.single('image'), updateUser)
        .delete(deleteUser);

router.route('/:user/:pass').get(login_session);
router.route('/:ci/:id/:sn').get(getUser_ci);
        

module.exports=router;

