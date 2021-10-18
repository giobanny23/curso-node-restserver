const {Router} = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole} = require('../middlewares/validar-roles');

const { esRolevalido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');


const { usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/',usuariosGet );

router.put('/:id', [
    check('id', 'NO es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio, debe ser mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol', 'NO es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolevalido),
    validarCampos

],usuariosPost);


router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('VENTAS_ROLE','NOSE_ROLE'),
    check('id', 'NO es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

module.exports = router;