const {response } = require('express');
const bcryptjs = require('bcryptjs');


const login =(req, res = response) =>{

    const {correo,password}=req.body;


    try {


        //Verificar si el email existe
        const usuario = await usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos- correo'
            });
        }

        //Si el usuario esta activo. 
        if(usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos- estado: false'
            });
        }
        
        //Verificacion del password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos- estado: false'
            });
        }


        res.json({
            msg:'Login Ok'
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

    

}

module.exports = {
    login
}