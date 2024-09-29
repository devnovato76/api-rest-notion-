import { request, response } from "express";
import { validationResult } from "express-validator";


const validarCampos = (req = request, resp = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json(errors);
  }
  next();
}

export { 
  validarCampos 
};