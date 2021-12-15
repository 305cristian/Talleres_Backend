const {Schema, model} = require('mongoose');

const visitas_tallerSchema = new Schema({

    id_taller: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    visitas: {
        type: Number,
        required: true,
        trim: true
    }
   
})


module.exports = model('visitastaller', visitas_tallerSchema);