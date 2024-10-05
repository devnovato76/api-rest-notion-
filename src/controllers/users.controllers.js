import {request, response}  from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/users.models.js'



const usersGet = async(req = request, resp = response) => {

  //const {q, nombre = "no name", apikey} = req.query;
  const {limit = 5, desde = 0} = req.query;
  const query = {estado: true};
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limit))
]);
  resp.json({
    total,
    usuarios
  });
};
const usersPost = async(req = request, resp = response) => {

  

  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});

  
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt)
  await usuario.save();

  await usuario.save();
  resp.json({
    msg: "Usuario creado correctamente",
    usuario
  });
};
const usersPut = async(req = request, resp = response) => {
  const {id }= req.params;
  const {_id, password, google, correo, ...resto} = req.body;
  if(password){
     const salt = bcryptjs.genSaltSync();
     resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  resp.json({
    msg: "Usuario actualizado correctamente",
    usuario,
  });
};
const usersDelete = async(req = request, resp = response) => {
   const { id } = req.params;
   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
  resp.json({
    msg: "Usuario borrado correctamente",
    usuario
  });
};

export { 
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
 };