import { Router } from "express";
import { createUser, deleteUser, readUser, updateUser } from "../controllers/user.controller.js";
import { validateName } from "../middlewares/validateInput.middleware.js";

const router = Router()

router.route('/create-user').post(validateName, createUser)

router.route('/read-user/:userId').get(readUser)

router.route('/update-user/:userId').patch(updateUser)

router.route('/delete-user/:userId').delete(deleteUser)

export default router