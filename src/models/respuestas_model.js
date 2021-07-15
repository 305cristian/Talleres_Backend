const {Schema, model}=require('mongoose');

const respuestasSchema= new Schema({
   pregunta_resp:{
     type:Schema.Types.ObjectId,
       required:true,
       trim:true  
   },
   resp_taller_id:{
     type:Schema.Types.ObjectId,
       required:true,
       trim:true  
   },
   respuesta:{
       type:String,
       required:true,
       trim:true
   },
 
   estadoresp:{
       type:Boolean,
       required:true,
       trim:true
   }
    
    
});

module.exports=model('respuestas', respuestasSchema);

