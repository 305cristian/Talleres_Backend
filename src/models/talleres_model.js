const {Schema, model}= require('mongoose');
//
const tallerSchema =new Schema({
    area_id:{
        type: Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description: {
        type:String,
        required:true,
        trim:true
    },
    image: {
        type:String,
        required:true,
        trim:true
    },
    video: {
        type:String,       
        trim:true
    },
    tiempo:{
        type:Number,
        required:true,
        trim:true
    },
    intentos:{
        type:Number,
        required:true,
        trim:true
    },
});

tallerSchema.methods.setImgUrl=function setImgUrl (filename) {
    this.image=filename;
}

module.exports= model('tallers', tallerSchema);








