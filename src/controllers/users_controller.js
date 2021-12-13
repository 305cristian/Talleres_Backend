const Users = require('../models/users_model');
const fs = require('fs-extra');
const path = require('path');
const md5 = require('md5');
const usersCtrl = {};

usersCtrl.getUser = async(req, resp) => {
    const usuario = await Users.findById(req.params.id);
    resp.json(usuario);
    resp.json('Usuario');
}
usersCtrl.getUser_ci = async(req, resp) => {
    const usuario_ci = await Users.findOne({cedula:req.params.ci});
    resp.json(usuario_ci);
    resp.json('Usuario');
}
usersCtrl.getUsers = async(req, resp) => {
    const usuarios = await Users.find();
    resp.json(usuarios);
    resp.json('Usuarios');
}
usersCtrl.createUser = async(req, resp) => {
    console.log(req.body)
    const{nombre, apellido, cedula, user, pass, rol, image} = req.body;

    const usuarios = new Users({nombre: nombre, apellido: apellido, cedula: cedula, user: user, pass: md5(pass), rol: rol, image: image})

//    if (req.file) {
//        const{filename} = req.file;
//        usuarios.setImgUrl(filename);
//    }

    await usuarios.save();
    resp.json('Usuario creado');
}
usersCtrl.updateUser = async(req, resp) => {
    console.log(req.body);
    console.log(req.file);
    var {nombre, apellido, cedula, user, pass, rol, image} = req.body;
//    if (req.file) {
//        const dir_img = await Users.findOne({_id: req.params.id}, {image: 1, _id: 0});
//        const{filename} = req.file;
//        image = filename;
//        if (dir_img !== '...') {
//            fs.unlink(path.resolve('src/storage/imguser/' + dir_img.image));
//        }
//    }
    const newUsuarios = ({nombre: nombre, apellido: apellido, cedula: cedula, user: user, pass: md5(pass), rol: rol, image: image})
    await Users.findByIdAndUpdate(req.params.id, newUsuarios);
    resp.json('Actualizado');
}
usersCtrl.deleteUser = async(req, resp) => {

    const dir_img = await Users.findOne({_id: req.params.id}, {image: 1, _id: 0});
//    if (dir_img !== '...') {
//        fs.unlink(path.resolve('src/storage/imguser/' + dir_img.image));
//    }
    await Users.findByIdAndRemove(req.params.id);
    resp.json('Usuario Eliminado');
}

usersCtrl.login_session = async(req, resp) => {
//    console.log(req.params.user);
//    console.log(req.params.pass);
    const user_login = await Users.findOne({user: req.params.user, pass: md5(req.params.pass)});
    resp.json(user_login);
}

module.exports = usersCtrl;

