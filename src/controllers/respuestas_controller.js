const Respuestas = require('../models/respuestas_model');
const Preguntas = require('../models/preguntas_model');
const mongoose = require('mongoose');



const ObjectId = mongoose.Types.ObjectId;
const respuestasCtrl = {};

respuestasCtrl.createRespuesta = async(req, resp) => {
    console.log(req.body);
    const {pregunta_resp, resp_taller_id, respuesta, estadoresp} = req.body;
    const pregunta = new Respuestas({pregunta_resp: pregunta_resp, resp_taller_id: resp_taller_id, respuesta: respuesta, estadoresp: estadoresp});
    await pregunta.save();
    resp.json('Respuesta insertada');

}

respuestasCtrl.editRespuesta = async (req, resp) => {
    const {pregunta_resp, respuesta, resp_taller_id, estadoresp} = req.body;
    const newresp = ({pregunta_resp: pregunta_resp, resp_taller_id: resp_taller_id, respuesta: respuesta, estadoresp: estadoresp});
    await Respuestas.findByIdAndUpdate(req.params.id_resp, newresp);
    resp.json('Actualizado');
}

respuestasCtrl.deleteRespuesta = async(req, resp) => {
    await Respuestas.findByIdAndRemove(req.params.id_resp)
    resp.json('eliminado')
}

respuestasCtrl.getRespuesta = async(req, resp) => {
//    console.log(req.params.id_resp);
    const respuesta = await Respuestas.findById(req.params.id_resp);
    resp.json(respuesta);
//    console.log(respuesta)
}

respuestasCtrl.getRespuestas = async (req, resp) => {
    //Respuestas es la coleccion padre
    console.log(req.params.id_taller);
    console.log(req.params.id_preg);
    const preg_resp = await Preguntas.aggregate([
        {
            $match: {
                _id: ObjectId(req.params.id_preg)
            }
        },

        {
            $lookup: {
                from: 'respuestas', //la coleccion hijo
                localField: '_id', //campo de la coleccion padre
                foreignField: 'pregunta_resp',
                as: 'respuestas'
            }

        },

        {$unwind: "$respuestas"},
//        {$match: {taller_id: ObjectId(req.params.id_taller)}}
    ]);
    resp.json(preg_resp); 
}
respuestasCtrl.getPreguntasRespuestas = async (req, resp) => {//Este metodo se lo utiliza en el componente evaluacion para pintar el QUIZ
    //Respuestas es la coleccion padre
    console.log('preguntasrespuestas')
    console.log(req.params.id_taller);

    const preg_resp = await Preguntas.aggregate([//Simulo un join para unir las preguntas a sus respectivas respuestas

        {
            $lookup: {
                from: 'respuestas', //la coleccion hijo
                localField: '_id', //campo de la coleccion padre
                foreignField: 'pregunta_resp',
                as: 'respuestas'
            },

        },

//        {$unwind: "$respuestas"},
        {
            $match: {taller_id: ObjectId(req.params.id_taller)}
        }, //Con esto filtro solo los que tienen el Id del taller seleccionado
        {
            $lookup: {
                from: 'tallers', //la coleccion hijo
                localField: 'respuestas.resp_taller_id', //campo de la coleccion padre
                foreignField: '_id',
                as: 'taller'
            }

        }

    ]);
    resp.json(preg_resp);
}

respuestasCtrl.getRespuestasxpregunta = async(req,resp)=>{
//    console.log(req.params.id_preg); 
    const resultado= await Respuestas.find({pregunta_resp:ObjectId(req.params.id_preg)}) ;
    resp.json(resultado) ;
//    console.log(resultado);
}

module.exports = respuestasCtrl;


