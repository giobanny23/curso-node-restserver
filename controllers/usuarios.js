const {response, request} = require('express');
const Usuario =require('../models/usuario');

const bcryptjs = require('bcryptjs');



const usuariosGet =async(req=request, res = response) => {


    //const {q, nombre ='No name', apikey,page = 1, limit} = req.query;
    const {limite = 5, desde= 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);      

    res.json({
        total,
        usuarios
    });
 }

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id,password, google,correo, ...resto} = req.body;

    //TODO validar con la base de datos 
    if( password){
        //Ecriptar el password.
        const salt  = bcryptjs.genSaltSync();
        resto.password =  bcryptjs.hashSync( password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);

        res.json(usuario);
 }

 const usuariosPost = async(req, res = response) => {


    const{nombre, correo,password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
        
        const salt = bcryptjs.genSaltSync();
        usuario.password =  bcryptjs.hashSync(password,salt);
        // //Guardar en BD
        await usuario.save();


        res.json({
            msg: 'post API- usuarioPost',
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