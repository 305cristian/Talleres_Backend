const {Router}= require('express');
const router =Router();

const {getPreguntasRespuestas}=require('../controllers/respuestas_controller');

router.route('/:id_taller').get(getPreguntasRespuestas);

module.exports=router;


