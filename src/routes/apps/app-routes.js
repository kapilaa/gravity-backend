import { Router } from "express";
import trimRequest from "trim-request"
import { todoList,todoCreate,todoDelete,todoUpdate } from "../../controllers/todos/todo.controller.js";
import { validate } from "../../validators/validate.js";
import { todosValidator } from "../../validators/apps/todos/index.js";

const router = Router();

router.route("/todo/create").post(trimRequest.all,todosValidator(), validate, todoCreate);
router.route("/todo/list").get(trimRequest.all, validate, todoList);
router.route("/todo/delete/:id").delete(trimRequest.all, validate, todoDelete);
router.route("/todo/update/:id").put(trimRequest.all, validate, todoUpdate);

export default router;

