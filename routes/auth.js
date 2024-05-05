import { check } from 'express-validator';
import { Router } from 'express';

import { login, register } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);
router.post('/register',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], register);



export {
    router
}
