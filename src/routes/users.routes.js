import { Router } from "express";
import { check } from "express-validator";
import { usersDelete, usersGet, usersPost, usersPut } from "../controllers/users.controllers.js";
import  {validarCampos} from "../middlewares/validar-campos.js";
//import Role from "../models/role.models.js";
import { emailExiste, esRoleValido, existeUsuarioPorId } from "../helpers/db-validators.js";

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
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usersPost
);
router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),

    validarCampos,
  ],
  usersPut
);


router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usersDelete
);


export default router;