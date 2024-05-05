import { response, request } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/usuario.js';

const usuariosGet = async (req =request, res = response) => {

    // const {q, nombre, apikey} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuario] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
 
    res.json({
        total,
        usuario
    });
};

const usuariosPost = async (req, res = response) => {

    

    
    const { correo, password, rol } = req.body;
    const usuario = new Usuario({ correo, password, rol });

    // verificar si el correo existe
    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = async (req, res = response) => {
    
    const {id} = req.params;
    const { _id, password, correo, ...resto } = req.body;

    // Validar contra base de datos
    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    
    res.json(usuario);
};
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
};
const usuariosDelete = async (req, res = response) => {

    const { id } = req. params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});
 
    res.json(usuario);
};

export {
    usuariosGet,
    usuariosPost,
    usuariosPut, 
    usuariosPatch,
    usuariosDelete
}
