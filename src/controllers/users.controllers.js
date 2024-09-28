import {request, response}  from 'express';


const usersGet = (req = request, resp = response) => {

  const {q, nombre = "no name", apikey} = req.query;
  resp.json({
    msg: "get  API",
    q,
    nombre,
    apikey
  });
};
const usersPost = (req = request, resp = response) => {

  const { nombre, edad } = req.body;
  resp.json({
    msg: "post  API",
    nombre,
    edad,
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