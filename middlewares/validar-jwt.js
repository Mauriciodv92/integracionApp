import { request, response } from 'express';
import Usuario from '../models/usuario.js';

import jwt from 'jsonwebtoken';


const validarJWT =async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticiónn'
        });
    }

    try {


        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }
        

        // Verificar si el uid tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            })
        }


        req.usuario = usuario

        

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

    console.log(token);

    
}




export {
    validarJWT
}