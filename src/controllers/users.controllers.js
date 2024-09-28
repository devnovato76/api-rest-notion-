import {request, response}  from 'express';
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

  const body = req.body;
  const usuario = new Usuario(body);
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