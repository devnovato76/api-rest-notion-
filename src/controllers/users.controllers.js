import {request, response}  from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/users.models.js'



const usersGet = (req = request, resp = response) => {

  const {q, nombre = "no name", apikey} = req.query;
  resp.json({
    msg: "get  API",
    q,
    nombre,
    apikey
  });
};
const usersPost = async(req = request, resp = response) => {

  

  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});

  const existeEmail = await Usuario.findOne({correo});
  if (existeEmail){
     return resp.status(400).json({
      msg: 'Ese correo ya está registrado',
     });
  }
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)
  await usuario.save();

  await usuario.save();
  resp.json({
    msg: "post  API",
    usuario
  });
};
const usersPut = (req = request, resp = response) => {
  const {id }= req.params;
  resp.json({
    msg: "put  API",
    id,
  });
};
const usersDelete = (req = request, resp = response) => {
   const { id } = req.params;
  resp.json({
    msg: "delete  API",
    id
  });
};

export { 
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
 };