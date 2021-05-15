const {Schema,model}=require('mongoose');

const preguntasSchema=new Schema({
    
    taller_id:{
        type:Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    pregunta:{
        type: String,
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

module.exports= model('preguntas',preguntasSchema);

