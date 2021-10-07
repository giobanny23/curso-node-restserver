const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolevalido  = async(rol = '') =>{
    const existeRol =  await Role.findOne({rol});
    if( !existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async(correo ='') =>{
      //Verificar si el correo exite.
      const existeEmail = await Usuario.findOne({ correo });
      if( existeEmail){
          throw new Error(`EL correo ${correo}, ya esta registrado`)
          }
      }
const existeUsuarioPorId = async(id) =>{
        //Verificar si exite el ID.
        const existeUsuario = await Usuario.findById( id );
        if( !existeUsuario){
            throw new Error(`EL ID no valido${id}`)
            }
        }

module.exports ={
    esRolevalido,
    emailExiste,
    existeUsuarioPorId
}