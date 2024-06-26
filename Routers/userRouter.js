import express from 'express';
import { buycourse, createcourse, deleteUser, editcourse, getcourse, getcourseid } from '../Controllers/userController.js';



const router = express.Router();

router.post("/create",createcourse)
router.get("/get",getcourse)
router.get("/getcourse/:id",getcourseid)
router.put("/update/:id",editcourse)
router.put("/buy/:id",buycourse)
router.delete("/delete/:id",deleteUser)

 

export default router;