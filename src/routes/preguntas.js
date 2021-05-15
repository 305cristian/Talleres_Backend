const {Router}=require('express');
const router=Router();

const {createPregunta} = require('../controllers/preguntas_controller');


router.route('/').post(function (req, resp) {
    console.log('aqui')
    console.log(req.body)
}); 
//router.route('/').get(getPreguntas);

//router.route('/:id').put(editPregunta);
//router.route('/:id').delete(deletePregunta);

module.exports = router;