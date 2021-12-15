const Visitas_taller=require('../models/visitas_taller_model');

const ctrlVisitasTaller={};

ctrlVisitasTaller.save_visitas = async (req, resp)=>{
    
    const {id_taller}=req.body;    
    const existe= await Visitas_taller.findOne({id_taller:id_taller},{visitas:1, _id:0});
    
    if(existe){
        
         var acmd=existe.visitas +1;
         await Visitas_taller.update({id_taller:id_taller},{visitas:acmd});
    }else{
    
        const visitas_taller=new Visitas_taller({id_taller:id_taller,visitas:1});
        await visitas_taller.save() ;
    }
    
    
}

ctrlVisitasTaller.get_visitas= async(req, resp)=>{
//   const resultado= await Visitas_taller.find();

    const resultado = await Visitas_taller.aggregate([
        {
            $lookup: {
                from: 'tallers', //Coleccion hijo (area)
                localField: 'id_taller', //la foranea de talleres
                foreignField: '_id', //el id de area
                as: 'talleres' //un alias
            }

        },
        {
            $unwind: '$talleres'
        }
    ]);
    
     resp.json(resultado);
}
module.exports=ctrlVisitasTaller;
