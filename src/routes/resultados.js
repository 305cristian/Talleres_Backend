const {Router}=require('express');
const router= Router();

const {save_resultados, get_resultados, get_resultados_taller}=require('../controllers/regis_result_controller')

router.route('/').post(save_resultados);
router.route('/').get();


router.route('/:id_user/:id_taller').get(get_resultados);
router.route('/:id_taller').get(get_resultados_taller);

router.route('/:id').put();


module.exports=router;