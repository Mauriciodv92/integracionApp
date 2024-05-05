import { response } from "express"

import Usuario from '../models/usuario.js'
import bcryptjs from 'bcryptjs';
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

const login = async(req, res = response) => {


    const { correo, password } =req.body;

    try {

        // Verificar si el email existe

        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }


        // Si el usuario está activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
             });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })
    

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    
}

const register = async(req, res = response) => {


    const { correo, password } = req.body;
    
        if (!password) {
            return res.status(400).send('La contraseña no puede estar vacía');
        }
    
        try {
            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await User.findOne({ correo });
    
            if (existingUser) {
                return res.send('El usuario ya existe. Por favor, elija un nombre de usuario diferente.');
            }
    
            // Hash de la contraseña utilizando bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
    
            // Crear un nuevo usuario con la contraseña hasheada
            const newUser = new User({
                correo: correo,
                password: hashedPassword
            });
    
            // Guardar el nuevo usuario en la base de datos
            await newUser.save();
            return res.send('Usuario registrado correctamente.');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error al procesar la solicitud');
        }
    
}




export {
    login, register
}