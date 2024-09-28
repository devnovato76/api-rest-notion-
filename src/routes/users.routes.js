import { Router } from "express";
import { usersDelete, usersGet, usersPost, usersPut } from "../controllers/users.controllers.js";

const router = Router();

router.get("/", usersGet
);
router.post("/", usersPost);
router.put("/:id", usersPut);
router.delete("/:id", usersDelete);


export default router;