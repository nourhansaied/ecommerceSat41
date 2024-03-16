


import express from 'express';
import {  addUser,checkEmail, deleteUser, getAllUsers, getUserById, updateUser } from './controller/user.controller.js';
import { validation } from '../../middleware/validation.js';
import { addUserSchema, updateUserSchema, userQueryIdSchema } from './user.validation.js';

const userRoutes = express.Router();



userRoutes.route("/")
    .post(checkEmail,validation(addUserSchema), addUser)
    .get(getAllUsers)

userRoutes.route("/:id")
.get(validation(userQueryIdSchema),getUserById)
.patch(validation(updateUserSchema),updateUser)
.delete(validation(userQueryIdSchema),deleteUser)


export default userRoutes;