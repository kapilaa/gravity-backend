import { Router } from "express";
import trimRequest from "trim-request"
import {
         todoList,
         todoCreate,
         todoDelete,
         todoUpdate,
         todoSearch,
         todoFilterStatus,
         todoChangeStatus
         } from "../../controllers/todos/todo.controller.js";
import { validate } from "../../validators/validate.js";
import { 
         todosValidator,
         searchValidator,
         statusValidator,
         statusChangeValidator
         } from "../../validators/apps/todos/index.js";
import { verifyToken } from "../../middlewares/auth/verify-token.js";
import authenticateJWT from "../../models/verify-token.js";
const router = Router();

router.route("/todo/create").post(trimRequest.all,verifyToken,authenticateJWT,todosValidator(), validate, todoCreate);
router.route("/todo/list").get(trimRequest.all,verifyToken,authenticateJWT, validate, todoList);
router.route("/todo/delete/:id").delete(trimRequest.all,verifyToken,authenticateJWT, validate, todoDelete);
router.route("/todo/update/:id").put(trimRequest.all,verifyToken,authenticateJWT, validate, todoUpdate);
router.route("/todo/search").post(trimRequest.all,verifyToken,authenticateJWT,searchValidator(), validate, todoSearch);
router.route("/todo/filter/status").post(trimRequest.all,verifyToken,authenticateJWT,statusValidator(), validate, todoFilterStatus);
router.route("/todo/update-status/:id").post(trimRequest.all,verifyToken,authenticateJWT,statusChangeValidator(), validate, todoChangeStatus);

export default router;

