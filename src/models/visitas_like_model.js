const {Schema, model} = require('mongoose');

const visitas_likeSchema = new Schema({

    id_area: {
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


module.exports = model('visitaslike', visitas_likeSchema);