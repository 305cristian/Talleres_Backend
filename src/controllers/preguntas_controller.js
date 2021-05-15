const Preguntas = require('../models/preguntas_model');
const path = require('path');

const preguntaCtrl = {};

preguntaCtrl.createPregunta = async(req, resp) => {
    console.log(req.body);
    const{taller_id, pregunta, respuesta, estadoresp} = req.body;
    const preguntas = new Preguntas({taller_id: taller_id, pregunta: pregunta, respuesta: respuesta, estadoresp: estadoresp});
    await preguntas.save();
    resp.json('Pregunta Registrada');
}

module.exports = preguntaCtrl;
