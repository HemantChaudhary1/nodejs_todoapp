import express from "express";

import {  getMyProfile, login, logout, register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();  

router.post("/new",register);

router.post("/login",login);
 
router.get("/logout",logout);

router.get("/me",isAuthenticated ,getMyProfile); // More prefferd way
//or
// router.get("/userid/:id",getUserDetails);
// router.put("/userid/:id",updateUser);
// router.delete ("/userid/:id",deleteUser);
 


export default router;