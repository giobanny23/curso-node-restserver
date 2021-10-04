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

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {password, google, ...resto} = req.body;

    //TODO validar con la base de datos 
    if( password){
        //Ecriptar el password.
        const salt  = bcryptjs.genSaltSync();
        resto.password =  bcryptjs.hashSync( password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg:'put API- usuariosPut',
        id
    });
 }

 const usuariosPost = async(req, res = response) => {

    

    const {nombre, correo, password, rol } =req.body;
    const usuario = new Usuario({nombre, correo, password,rol});

  
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