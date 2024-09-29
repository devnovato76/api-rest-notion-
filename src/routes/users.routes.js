import { Router } from "express";
import { check } from "express-validator";
import { usersDelete, usersGet, usersPost, usersPut } from "../controllers/users.controllers.js";
import  {validarCampos} from "../middlewares/validar-campos.js";
import Role from "../models/role.models.js";

const router = Router();

router.get("/", usersGet
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom( async(rol = '') => {
       const existeRol = await Role.findOne({ rol });
       if(!existeRol){ 
         throw new Error(`El rol ${ rol } no está registrado en la DB`)
       }
    }),
    validarCampos,
  ],
  usersPost
);
router.put("/:id", usersPut);
router.delete("/:id", usersDelete);


export default router;