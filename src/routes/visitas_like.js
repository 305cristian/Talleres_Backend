const {Router}=require('express');
const router=Router();

const {save_visitas,get_visitas,save_like} = require('../controllers/visitas_lke_controller');

router.route('/').post(save_visitas); 
router.route('/').get(get_visitas); 

module.exports = router;


