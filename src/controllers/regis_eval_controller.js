const Regis_eval = require('../models/regis_eval_model');
const mongoose = require('mongoose');

const regis_evalCtrl = {};

var date = new Date();
var dateActual = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

const ObjectId = mongoose.Types.ObjectId;
const respuestasCtrl = {};

regis_evalCtrl.registrarEvaluacion = async(req, resp) => {
//    console.log(req.body);
    const {id_user, id_taller, ci_user, estado, puntuacion} = req.body;
    const regis_eval = new Regis_eval({id_user: id_user, id_taller: id_taller,puntuacion:puntuacion, estado: estado, intentos: 1, ci_user: ci_user, fecha_regis: date});

    const taller = await Regis_eval.findOne({id_user: id_user, id_taller: id_taller}, {estado: 1, _id: 1, intentos: 1});

    if (!taller) {
        await regis_eval.save();
    } else {
        const acmd_intentos = taller.intentos + 1;
        const edit_eval = ({id_user: id_user, id_taller: id_taller, estado: estado,puntuacion:puntuacion, intentos: acmd_intentos, ci_user: ci_user, fecha_regis: date});
        await Regis_eval.findByIdAndUpdate(taller._id, edit_eval);

    }
    resp.json('Notas registradas');

}



regis_evalCtrl.getUserTaller = async(req, resp) => {
//    console.log(req.params.id)
//    console.log(req.body)
    const user_talleres = await Regis_eval.find({id_user: req.params.id});
    resp.json(user_talleres);

}
regis_evalCtrl.getUserTaller_ci = async(req, resp) => {
//    const user_talleres_ci = await Regis_eval.find({ ci_user: req.params.ci});
    const user_talleres_ci = await Regis_eval.aggregate([
        {
            $match: {
                ci_user: req.params.ci
            }
        },
        {
            $lookup: {
                from: 'tallers',
                localField: 'id_taller',
                foreignField: '_id',
                as: 'taller_user'
            }
        },
        {
            $unwind: '$taller_user'
        }
    ])
    resp.json(user_talleres_ci);
//    console.log(user_talleres_ci);


}


regis_evalCtrl.getUserTalleres = async(req, resp) => {
//    console.log(req.params.id)
//    console.log(req.body)
    const user_talleres = await Regis_eval.find({estado: 1});
    resp.json(user_talleres);

}

regis_evalCtrl.reset_Intentos = async(req, resp) => {
//    console.log(req.params.id);
    const data_reset=({intentos:0});
    const reset_intentos=await Regis_eval.findByIdAndUpdate(req.params.id, data_reset);
    resp.json(reset_intentos);
}

regis_evalCtrl.getNotas =async (req,resp)=>{
//    console.log('....'+req.params.id_user);
    console.log('.....'+req.params.id_taller);
    const resultados=await Regis_eval.findOne({id_user:ObjectId(req.params.id_user),id_taller:ObjectId(req.params.id_taller)},{puntuacion:1, _id:0 });
    resp.json(resultados);
//    console.log('.....',resultados);
}


module.exports = regis_evalCtrl;


