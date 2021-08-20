const express =require('express');
const cors =require('cors');

const app=express();

//setting
app.set('port',process.env.PORT || 4000);


//middelwars
app.use(cors());
app.use(express.json());


//routes
app.use('/public_image',express.static(`${__dirname}/storage/img`));
app.use('/public_image_area',express.static(`${__dirname}/storage/imgarea`)) ;
app.use('/public_video',express.static(`${__dirname}/storage/video`));
app.use('/public_image_user',express.static(`${__dirname}/storage/imguser`));

app.use('/api/talleres', require('./routes/talleres'));
app.use('/api/talleres_ar', require('./routes/talleres_area'));
app.use('/api/areas', require('./routes/areas'));
app.use('/api/users', require('./routes/users'));
app.use('/api/preguntas',require('./routes/preguntas'));
app.use('/api/respuestas',require('./routes/respuestas'));
app.use('/api/evaluacion',require('./routes/evaluacion'));
app.use('/api/user_taller',require('./routes/user_taller'));

module.exports=app;
