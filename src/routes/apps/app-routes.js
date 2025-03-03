import { Router } from "express";
import trimRequest from "trim-request"
import {
         productList,
         productCreate,
         productDelete,
         productUpdate,
         productSearch,
         productFilterStatus,
         productChangeStatus
         } from "../../controllers/products/products.controller.js";

import { userList,userCreate,userDelete,userUpdate } from "../../controllers/users/users.controllers.js"; 

import { validate } from "../../validators/validate.js";
import { 
         productValidator,
         searchValidator,
         statusValidator,
         statusChangeValidator
         } from "../../validators/apps/products/index.js";

import { userRegisterValidator } from "../../validators/apps/auth/user.validators.js";      

import { verifyToken } from "../../middlewares/auth/verify-token.js";
import authenticateJWT from "../../models/verify-token.js";
const router = Router();

/**
 * 
 * products CURD Operations
 * 
 */

router.route("/product/create").post(trimRequest.all,verifyToken,authenticateJWT,productValidator(), validate, productCreate);
router.route("/product/list").get(trimRequest.all,verifyToken,authenticateJWT, validate, productList);
router.route("/product/delete/:id").delete(trimRequest.all,verifyToken,authenticateJWT, validate, productDelete);
router.route("/product/update/:id").patch(trimRequest.all,verifyToken,authenticateJWT, validate, productUpdate);
router.route("/product/search").post(trimRequest.all,verifyToken,authenticateJWT,searchValidator(), validate, productSearch);
router.route("/product/filter/status").post(trimRequest.all,verifyToken,authenticateJWT,statusValidator(), validate, productFilterStatus);
router.route("/product/update-status/:id").post(trimRequest.all,verifyToken,authenticateJWT,statusChangeValidator(), validate, productChangeStatus);

/**
 * 
 * End
 * 
 */


/**
 * 
 * Users CURD Operations
 * 
 */

router.route("/user/create").post(trimRequest.all,verifyToken,authenticateJWT,userRegisterValidator(), validate, userCreate);
router.route("/user/list").get(trimRequest.all,verifyToken,authenticateJWT, validate, userList);
router.route("/user/delete/:id").delete(trimRequest.all,verifyToken,authenticateJWT, validate, userDelete);
router.route("/user/update/:id").put(trimRequest.all,verifyToken,authenticateJWT, validate, userUpdate);

/**
 * 
 * End
 * 
 */

export default router;

