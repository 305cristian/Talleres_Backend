
const Regis_eval = require('../models/regis_eval_model');

const regis_evalCtrl={};

var date = new Date();
var dateActual = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

regis_evalCtrl.registrarEvaluacion= async(req, resp)=>{
//    console.log(req.body);
    const {id_user,id_taller,estado}=req.body;    
    const regis_eval=new Regis_eval({id_user:id_user,id_taller:id_taller,estado:estado, fecha_regis:date});
    
    const taller= await Regis_eval.findOne({id_user:id_user,id_taller:id_taller},{estado:1,_id:1});

    if(!taller){
           await regis_eval.save();
    }else{
        edit_eval=({id_user:id_user,id_taller:id_taller,estado:estado, fecha_regis:date});
          await Regis_eval.findByIdAndUpdate(taller._id,edit_eval);
  
    }
    resp.json('Notas registradas');
    
}



regis_evalCtrl.getUserTaller= async(req, resp)=>{
//    console.log(req.params.id)
    console.log(req.body)
    const user_talleres=await Regis_eval.find({estado:1, id_user:req.params.id});
    resp.json(user_talleres);
    
}

regis_evalCtrl.getUserTalleres= async(req, resp)=>{
//    console.log(req.params.id)
    console.log(req.body)
    const user_talleres=await Regis_eval.find({estado:1});
    resp.json(user_talleres);
    
}


module.exports=regis_evalCtrl;


