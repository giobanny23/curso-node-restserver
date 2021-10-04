const Role = require('../models/role');
const usuario = require('../models/usuario');

const esRolevalido  = async(rol = '') =>{
    const existeRol =  await Role.findOne({rol});
    if( !existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async(correo ='') =>{
      //Verificar si el correo exite.
      const existeEmail = await usuario.findOne({ correo });
      if( existeEmail){
          throw new Error(`EL correo ${correo}, ya esta registrado`)
          }
      }


module.exports ={
    esRolevalido,
    emailExiste
}