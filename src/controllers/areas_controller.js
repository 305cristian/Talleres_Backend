const Area =require('../models/areas_model');
var fs =require('fs-extra');
const path=require('path');

const areasCtrl={};

areasCtrl.getArea = async(req, resp)=>{
   const area= await Area.findById(req.params.id);
   resp.json(area);
   resp.json('Area')
}
//areasCtrl.getAreaId = async(req, resp)=>{
//    console.log('llego con id')
//   const area= await Area.findOne(req.params.id);
//   resp.json(area);
//   resp.json('Area')
//}
areasCtrl.getAreas = async(req, resp)=>{
   const areas= await Area.find();
   resp.json(areas);
   resp.json('Lista de Areas')
}
areasCtrl.createArea = async(req, resp)=>{
    const {title, description}=req.body;
    console.log(req.body)
    console.log(req.file);
    const area=new Area({title:title, description:description});
    if(req.file){
        const{filename}=req.file;
        area.setImgUrl(filename);
    }
    await area.save();
    resp.json('Area creada');
}
areasCtrl.editArea =async(req, resp)=>{
    var {title,description,image}=req.body;
    console.log(req.body);
    console.log(req.file); 
    if(req.file){
        const dir_img=await Area.findOne({'_id':req.params.id},{'image':1,'_id':0});
        const {filename}=req.file;
        image=filename;
        if(dir_img){
            fs.unlink(path.resolve('src/storage/imgarea/'+dir_img.image)) 
        }
    }
    const newArea=({title:title,description:description, image:image});
    await Area.findByIdAndUpdate(req.params.id,newArea);
    resp.json('Area actualizada')
    
}
areasCtrl.deleteArea =async(req, resp)=>{
    const dir_img=await Area.findOne({'_id':req.params.id},{'image':1,'_id':0});
    if(dir_img){
         fs.unlink(path.resolve('src/storage/imgarea/'+dir_img.image))
    }
    
    await Area.findByIdAndRemove(req.params.id)
    resp.json('Area eliminada')
    
}

module.exports=areasCtrl;

