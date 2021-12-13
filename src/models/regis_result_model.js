const {Schema,model}=require('mongoose');

const resultadosSchema=new Schema({
    id_user:{
      type:Schema.Types.ObjectId,
      required:true,
      trim:true
    },
    id_taller:{
      type:Schema.Types.ObjectId,
      required:true,
      trim:true
    },
    id_preg:{
      type:Schema.Types.ObjectId,
      required:true,
      trim:true
    },
    resp:{
      type:String,
      required:true,
      trim:true
    },
    estado_resp:{
      type:String,
      required:true,
      trim:true
    }
});

module.exports=model('resultados', resultadosSchema);
