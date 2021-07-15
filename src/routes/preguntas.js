const {Router}=require('express');
const router=Router();

const {createPregunta, getPregunta, getPreguntas_taller, editPregunta, deletePregunta} = require('../controllers/preguntas_controller');


router.route('/').post(createPregunta); 


router.route('/:id').get(getPreguntas_taller);
router.route('/:id_taller/:id_preg').get(getPregunta);
router.route('/:id').put(editPregunta);
router.route('/:id').delete(deletePregunta);

module.exports = router;