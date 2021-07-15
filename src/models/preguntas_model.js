const {Schema, model} = require('mongoose');

const preguntasSchema = new Schema({

    taller_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    pregunta: {
        type: String,
        required: true,
        trim: true
    },
    puntaje: {
        type: Number,
        required: true,
        trim: true
    },

    estadopreg: {
        type: Boolean,
        required: true,
        trim: true
    }




});

module.exports = model('preguntas', preguntasSchema);

