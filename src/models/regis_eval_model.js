const {Schema, model} = require('mongoose');

const regis_evalSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    id_taller: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    fecha_regis: {
        type: Date,
        required: true,
        trim: true
    }
})


module.exports = model('user_talleres', regis_evalSchema);