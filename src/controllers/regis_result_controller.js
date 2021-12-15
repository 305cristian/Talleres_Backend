const Resultados = require('../models/regis_result_model');
const Preguntas = require('../models/preguntas_model');
const mongoose = require('mongoose');

const resultadosCtrl = [];
const ObjectId = mongoose.Types.ObjectId;

resultadosCtrl.save_resultados = async(req, resp) => {
//    console.log(req.body);
    const {id_user, ci_user, id_taller, preguntas_eval, respuestas_eval, estado_resp_eval} = req.body;

    const existe = await Resultados.findOne({id_user: id_user, id_taller: id_taller});

    if (existe) {
        await Resultados.remove({id_user: id_user, id_taller: id_taller})
        resp.json('Resultados sobreescritos');

    }

    preguntas_eval.map(async(data, index) => {
        console.log('pregunta', data);
        console.log('respuesta', respuestas_eval[index]);
        console.log('estado_resp', estado_resp_eval[index]);
        const data_result = new Resultados({
            id_user: id_user,
            ci_user: ci_user,
            id_taller: id_taller,
            id_preg: data,
            resp: respuestas_eval[index],
            estado_resp: estado_resp_eval[index]

        });
        await data_result.save();


    });



    console.log('hola insecto');
};

resultadosCtrl.get_resultados = async(req, resp) => {
    console.log(req.params.id_user);
    console.log(req.params.id_taller);

//    const resultado_eval= await Resultados.find({id_user:req.params.id_user, id_taller:req.params.id_taller});
    const resultado_eval = await Resultados.aggregate([
        {
            $match: {
                id_user: ObjectId(req.params.id_user),
                id_taller: ObjectId(req.params.id_taller)
            }
        },
        {
            $lookup: {
                from: 'preguntas',
                localField: 'id_preg',
                foreignField: '_id',
                as: 'preg_taller'
            }
        },
        {
            $unwind: '$preg_taller'
        }
    ]);

    resp.json(resultado_eval);
//    console.log(resultado_eval);
    resp.json('Resultados');
};

resultadosCtrl.get_resultados_taller = async(req, resp) => {

    const resultado_taller = await Resultados.find({id_taller: ObjectId(req.params.id_taller)});
    resp.json(resultado_taller);
//    console.log(resultado_taller);
};

resultadosCtrl.get_all = async (req, resp) => {

    const resultado = await Resultados.aggregate([     
        {
            $match: {
                        estado_resp: '0'
                    }
        },  
        {
            $group: {
                     _id: null, //_id es un identificador unico, voy agrupar mediante id_preg de la coleccion
                     pregId: {
                        $addToSet: '$id_preg',
                     },
                     cont:{$sum:1},// sumo el numero de items que se agruparon
                     suma:{$sum:'$estado_resp'},// sumo el todal  de estado_resp de los items agrupados
                    }
                  
        },
        {
            $lookup: {
                from: 'preguntas', //Coleccion hijo (area)
                localField: 'pregId', //la foranea de talleres
                foreignField: '_id', //el id de area
                as: 'preguntas_get' //un alias
            }

        },       
        {
            $unwind: '$preguntas_get'
        }
        
    ]);
        
    resp.json(resultado);
}

module.exports = resultadosCtrl;