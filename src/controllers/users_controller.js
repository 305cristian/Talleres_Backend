const Users = require('../models/users_model');
const fs = require('fs-extra');
const path = require('path');

const usersCtrl = {};

usersCtrl.getUser = async(req, resp) => {
    const usuario = await Users.findById(req.params.id);
    resp.json(usuario);
    resp.json('Usuario');
}
usersCtrl.getUsers = async(req, resp) => {
    const usuarios = await Users.find();
    resp.json(usuarios);
    resp.json('Usuarios');
}
usersCtrl.createUser = async(req, resp) => {
    console.log(req.body)
    const{nombre, apellido, cedula, rol, image} = req.body;

    const usuarios = new Users({nombre: nombre, apellido: apellido, cedula: cedula, rol: rol, image:image})

    if (req.file) {
        const{filename} = req.file;
        usuarios.setImgUrl(filename);
    }

    await usuarios.save();
    resp.json('Usuario creado');
}
usersCtrl.updateUser = async(req, resp) => {
    console.log(req.body);
    const{nombre, apellido, cedula, rol, image} = req.body;
    if (req.file) {
        const dir_img = await Users.findOne({_id: req.params.id}, {image: 1, _id: 0});
        const{filename} = req.file;
        image = filename;
        if (dir_img) {
            await fs.unlink(path.resolve('src/storage/imguser/' + dir_img.image));
        }
    }
    const newUsuarios = ({nombre: nombre, apellido: apellido, cedula: cedula, rol: rol, image: image})
    await Users.findByIdAndUpdate(req.params.id, newUsuarios);
    resp.json('Actualizado');
}
usersCtrl.deleteUser = async(req, resp) => {

    const dir_img = await Users.findOne({_id: req.params.id}, {image: 1, _id: 0});
    if (dir_img !== '...') {
         fs.unlink(path.resolve('src/storage/imguser/' + dir_img.image));
    }
    await Users.findByIdAndRemove(req.params.id);
    resp.json('Usuario Eliminado')
}

module.exports = usersCtrl;

