const Taller = require('../models/talleres_model');
var fs = require('fs-extra');
const path = require('path');


const talleresCtrl = {};

talleresCtrl.getTaller = async (req, resp) => {
    const taller = await Taller.findById(req.params.id);
    resp.json(taller);
    resp.json('Tarea');
};

talleresCtrl.getTalleres = async(req, resp) => {
    const talleres = await Taller.find();
    resp.json(talleres);
    resp.json('Tareas');
};

talleresCtrl.getTalleresArea = async(req, resp) => {
    //La coleccion padre es Tallers
    console.log('si llego')
    const talleres = await Taller.aggregate([
        {
            $lookup: {
                from: 'areas', //Coleccion hijo (area)
                localField: 'area_id', //la foranea de talleres
                foreignField: '_id', //el id de area
                as: 'talleresArea' //un alias
            }

        },
        {
            $unwind: '$talleresArea'
        }
    ]).sort({talleresArea:1});
    
    resp.json(talleres);
    resp.json('Talleres con area');
    console.log(talleres);
}

talleresCtrl.getTalleres_area = async(req, resp) => {
    console.log('Entro');
    console.log(req.params.id);
    const talleres = await Taller.find({area_id: req.params.id});
    resp.json(talleres);
    resp.json('Tareas por areas');
};


talleresCtrl.editTaller = async (req, resp) => {
    var {title, description, area_id, image, video} = req.body;
    console.log(req.body);
    console.log(req.files);
//    var img_url = dir_image.name;
//    console.log(dir_image.name)
    if (req.files) {
//    const ext = path.extname(req.files['image'][0].originalname);

        if (req.files['image']) {
            const dir_image = await Taller.findOne({_id: req.params.id}, {image: 1, _id: 0});
//        if (ext === '.jpeg' || ext === '.png' || ext === '.jpg') {
            const{filename} = req.files['image'][0];
            image = filename;
            if (dir_image) {
                await fs.unlink(path.resolve("src/storage/img/" + dir_image.image));
            }
        } else if (req.files['video']) {
            const dir_video = await Taller.findOne({_id: req.params.id}, {video: 1, _id: 0});
//        }else if(ext==='.mp4' || ext==='.vlc' || ext==='.avi'){
            const{filename} = req.files['video'][0];
            video = filename;
            if (dir_video !== '...') {
                fs.unlink(path.resolve("src/storage/video/" + dir_video.video))
            }
        }


    }
    const  newTaller = ({title: title, description: description, area_id: area_id, image: image, video: video});
    await  Taller.findByIdAndUpdate(req.params.id, newTaller);
    resp.json('Taller actualizado');
};


talleresCtrl.deleteTaller = async (req, resp) => {
    const dir_image = await Taller.findOne({_id: req.params.id}, {image: 1, _id: 0});
    if (dir_image) {
        console.log(dir_image.image)
        await fs.unlink(path.resolve("src/storage/img/" + dir_image.image));
    }
    await Taller.findByIdAndRemove(req.params.id);
    resp.json('Taller eliminado');
};


talleresCtrl.createTaller = async (req, resp) => {

    const{title, description, area_id, video} = req.body;
    console.log(req.body);
    console.log(req.files['image'][0]);
    const taller = new Taller({title: title, description: description, area_id: area_id, video: video});
    if (req.files) {
        const{filename} = req.files['image'][0];
        taller.setImgUrl(filename);
    }
    await taller.save();
    resp.json('Taller Creado');
};

module.exports = talleresCtrl;


