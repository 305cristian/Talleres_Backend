const {Router}=require('express');
const router= Router();

const {registrarEvaluacion,getUserTaller,getUserTalleres,getUserTaller_ci, reset_Intentos}=require('../controllers/regis_eval_controller')

router.route('/').post(registrarEvaluacion);
router.route('/').get(getUserTalleres);


router.route('/:id').get(getUserTaller);

router.route('/:id').put(reset_Intentos);

router.route('/:id/:ci').get(getUserTaller_ci);

module.exports=router;