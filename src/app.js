import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import logger from 'morgan';
import httpContext from 'express-http-context';
import { swaggerFunction } from "./swagger/index.js";

//---------------------------------------------------------------
//-------------------------- api routes--------------------------
import { errorHandler } from "./middlewares/error.middlewares.js";
import authUser from "./routes/auth/user-auth.js";
import objectRoute from "./routes/apps/app-routes.js"
import home from "./routes/home/home.js";
// const __dirname = path.resolve();
var app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(logger('dev'));
app.use(express.json({ limit: "500mb" })); // Set limit to 50MB
app.use(express.urlencoded({ limit: "500mb", extended: true })); 
app.use(cookieParser());
app.use(httpContext.middleware);
const httpServer = createServer(app);

//--------------------------------------------------------------------------/
//------------                   Route Initialization       ----------------/
//--------------------------------------------------------------------------/

app.get('/',home);
app.use("/api/v2/auth", authUser);
app.use("/api/v2", objectRoute);
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Invalid API URL OR Invalid Request Method ',
    message: `Request OR Route  ${req.originalUrl} is not found`,
  });
});

//---------------------------------Swagger integration-----------------------------------------/

/**
 * 
 * 
 */
async function swaggerFunc(app){
  await swaggerFunction(app)
}
swaggerFunc(app)

/**
 * 
 */
//------------------------------Error Handling------------------------------/
app.use(errorHandler);
//--------------------------------------------------------------------------/

export { httpServer };
