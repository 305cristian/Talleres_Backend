const {Router}=require('express');
const router=Router();

const {createRespuesta,editRespuesta,deleteRespuesta,getRespuesta, getRespuestas,getPreguntasRespuestas,getRespuestasxpregunta}=require('../controllers/respuestas_controller');

router.route('/').post(createRespuesta);

router.route('/:id_preg/:id_taller').get(getRespuestas);

router.route('/:id_preg/:id_taller/:id').get(getRespuestasxpregunta);

router.route('/:id_resp').get(getRespuesta);

router.route('/:id_resp').put(editRespuesta);

router.route('/:id_resp').delete(deleteRespuesta);



module.exports=router;