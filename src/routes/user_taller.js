const {Router}=require('express');
const router= Router();

const {registrarEvaluacion,getUserTaller,getUserTalleres}=require('../controllers/regis_eval_controller')

router.route('/').post(registrarEvaluacion);
router.route('/').get(getUserTalleres);


router.route('/:id').get(getUserTaller);

module.exports=router;