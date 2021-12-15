const Preguntas = require('../models/preguntas_model');
const Taller = require('../models/talleres_model');
const path = require('path');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
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
    const preguntas = await Preguntas.find({taller_id: ObjectId(req.params.id)});
    resp.json(preguntas);
    resp.json('Preguntas');
    console.log(preguntas);
};



preguntasCtrl.createPregunta = async (req, resp) => {
    console.log(req.body);
    const{taller_id, pregunta, respuesta, puntaje, estadopreg, tipo_preg} = req.body;
    const preguntas = new Preguntas({taller_id: taller_id, pregunta: pregunta, puntaje: puntaje, estadopreg: estadopreg, tipo_preg:tipo_preg});
    await preguntas.save();
    const taller = ({evaluacion: '1'});//lE PONGO A EVALUACION EN ESTADO 1 PARA INDICARLE QUE EL TALLER TIEN REGISTRADO EVALUACION
    await Taller.findByIdAndUpdate(req.body.taller_id, taller);//aCTUALIZO EL TALLER LE PASO DE ESTADO 0 A ESTADO 1, EL CUAL INDICA QUE HAY EVALUACION
    resp.json('Pregunta Registrada');
};

preguntasCtrl.editPregunta = async(req, resp) => {
//    console.log(req.body);
//    console.log(req.params.id);
    const{taller_id, pregunta, puntaje, estadopreg, tipo_preg} = req.body;
    const  newpreg = ({taller_id: taller_id, pregunta: pregunta, puntaje: puntaje, estadopreg: estadopreg, tipo_preg:tipo_preg});
    await  Preguntas.findByIdAndUpdate(req.params.id, newpreg);
    resp.json('actualizado exitosamente')

};
preguntasCtrl.deletePregunta = async(req, resp) => {
    console.log(req.params.id);
    await Preguntas.findByIdAndRemove(req.params.id);

//ESTE APARTADO ES PARA ESPECIFICAR SI EL TALLER TIEN EVALUACION 0 NO
    const preguntas = await Preguntas.findOne({taller_id: req.params.id_taller});
    if (!preguntas) {
        const taller = ({evaluacion: '0'});//lE PONGO A EVALUACION EN ESTADO 0 PARA INDICARLE QUE EL TALLER NO TIEN REGISTRADO EVALUACION
        await Taller.findByIdAndUpdate(req.params.id_taller, taller);//aCTUALIZO EL TALLER LE PASO DE ESTADO 1 A ESTADO 0, EL CUAL INDICA QUE HAY EVALUACION 
    }


    resp.json('Eliminado exitosamente')
};

module.exports = preguntasCtrl;
