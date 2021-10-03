const {response, request} = require('express');
const Usuario =require('../models/usuario');

const bcryptjs = require('bcryptjs');


const usuariosGet = (req=request, res = response) => {


    const query = req.query;
    
    res.json({
        msg:'get API- usuariosGet',
        query
    });
 }

const usuariosPut = (req, res = response) => {

    const {id} = req.params;


    res.json({
        msg:'put API- usuariosPut',
        id
    });
 }

 const usuariosPost = async(req, res = response) => {

    

    const {nombre, correo, password, rol } =req.body;
    const usuario = new Usuario({nombre, correo, password,rol});

    //Verificar si el correo exite.
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail){
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        });
    }
    //Ecriptar el password.
    const salt  = bcryptjs.genSaltSync();
    usuario.password =  bcryptjs.hashSync( password, salt);
    //Guardar en BD
    await usuario.save();

    res.json({
        usuario

    });
 }

 const usuariosDelete = (req, res= response) => {
    res.json({
        msg:'delete API- usuarioDelete'
    });
 }


 module.exports ={
     usuariosGet,
     usuariosPut,
     usuariosPost,
     usuariosDelete,
 }