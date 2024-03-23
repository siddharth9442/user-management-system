import { Router } from "express";
import { createUser, deleteUser, readUser, updateUser } from "../controllers/user.controller.js";

const router = Router()

router.route('/create-user').post(createUser)

router.route('/read-user/:userId').get(readUser)

router.route('/update-user/:userId').patch(updateUser)

router.route('/delete-user/:userId').delete(deleteUser)

export default router