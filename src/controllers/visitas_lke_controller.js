const Visitas_like=require('../models/visitas_like_model');

const ctrlVisitasLike={};

ctrlVisitasLike.save_visitas = async (req, resp)=>{
    
    const {id_area}=req.body;    
    const existe= await Visitas_like.findOne({id_area:id_area},{visitas:1, _id:0});
    
    if(existe){
        
         var acmd=existe.visitas +1;
         await Visitas_like.update({id_area:id_area},{visitas:acmd});
    }else{
    
        const visitas_lik=new Visitas_like({id_area:id_area,visitas:1});
        await visitas_lik.save() ;
    }
    
    
}

ctrlVisitasLike.get_visitas= async(req, resp)=>{
//   const resultado= await Visitas_like.find();

    const resultado = await Visitas_like.aggregate([
        {
            $lookup: {
                from: 'areas', //Coleccion hijo (area)
                localField: 'id_area', //la foranea de talleres
                foreignField: '_id', //el id de area
                as: 'talleresArea' //un alias
            }

        },
        {
            $unwind: '$talleresArea'
        }
    ]).sort({talleresArea:1});
    
     resp.json(resultado);
}
module.exports=ctrlVisitasLike;
