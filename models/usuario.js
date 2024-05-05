import { Schema, model } from "mongoose";

const UsuarioSchema = Schema({

    correo: { 
        type : String,
        required:[true,"El correo es obligatorio"],
        unique: true
    },
    password: { 
        type : String,
        required:[true,"La contraseña es obligatoria"]
    },
    img: { 
        type : String
    },
    rol: { 
        type : String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }

});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}





const Usuario = model('Usuario', UsuarioSchema);

export default Usuario;

