const {Schema, model}= require('mongoose');

const areaSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true 
    }
})

areaSchema.methods.setImgUrl=function setImgUrl (filename) {
    this.image=filename;
}
module.exports= model('areas', areaSchema);