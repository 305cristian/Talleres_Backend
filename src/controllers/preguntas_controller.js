const Preguntas = require('../models/preguntas_model');
const path = require('path');

const preguntasCtrl = {};


preguntasCtrl.getPregunta = async (req, resp) => {
//    console.log(req.params.id_preg)
//    console.log(req.params.id_taller)
    const pregunta = await Preguntas.findOne({taller_id: req.params.id_taller, _id: req.params.id_preg});
//    console.log(pregunta)
    resp.json(pregunta);
    resp.json('pregunta');
};
preguntasCtrl.getPreguntas_taller = async (req, resp) => {
    const preguntas = await Preguntas.find({taller_id: req.params.id});
    resp.json(preguntas);
    resp.json('Preguntas');
};



preguntasCtrl.createPregunta = async (req, resp) => {
    console.log(req.body);
    const{taller_id, pregunta, respuesta, puntaje, estadopreg} = req.body;
    const preguntas = new Preguntas({taller_id: taller_id, pregunta: pregunta, puntaje: puntaje, estadopreg: estadopreg});
    await preguntas.save();
    resp.json('Pregunta Registrada');
};

preguntasCtrl.editPregunta = async(req, resp) => {
//    console.log(req.body);
//    console.log(req.params.id);
    const{taller_id, pregunta, puntaje, estadopreg} = req.body;
    const  newpreg = ({taller_id: taller_id, pregunta: pregunta, puntaje: puntaje, estadopreg: estadopreg});
    await  Preguntas.findByIdAndUpdate(req.params.id, newpreg);
    resp.json('actualizado exitosamente')

};
preguntasCtrl.deletePregunta = async(req, resp) => {
    console.log(req.params.id)
    await Preguntas.findByIdAndRemove(req.params.id)
    resp.json('Eliminado exitosamente')
};

module.exports = preguntasCtrl;
