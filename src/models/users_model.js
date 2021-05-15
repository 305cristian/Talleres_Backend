const {Schema, model}= require('mongoose');

const usuarioSchema=new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        trim:true
    },
    cedula:{
        type:String,
        required:true,
        trim:true 
    },
    rol:{
        type:String,
        required:true,
        trim:true 
    },
    image:{
        type:String,
        trim:true 
    }
})

usuarioSchema.methods.setImgUrl=function setImgUrl (filename) {
    this.image=filename;
}
module.exports= model('usuarios', usuarioSchema);

