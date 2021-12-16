const mongoose= require('mongoose');

const URI=process.env.MONGODB_URI ? process.env.MONGODB_URI:'mongodb://localhost/test2';
mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

const connection=mongoose.connection ;

connection.once('open', () =>{
    console.log('Database in connect')
})
