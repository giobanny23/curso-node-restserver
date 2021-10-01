const {response, request} = require('express');
const Usuario =require('../models/usuario');

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

    const body =req.body;
    const usuario = new Usuario( body );

    await usuario.save();
    res.json({
        msg:'post API- usuarioPost',
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