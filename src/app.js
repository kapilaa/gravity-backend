import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import path from 'path';
import logger from 'morgan';
import httpContext from 'express-http-context';


//---------------------------------------------------------------
//-------------------------- api routes--------------------------
import { errorHandler } from "./middlewares/error.middlewares.js";
import authUser from "./routes/auth/user-auth.js";
import objectRoute from "./routes/apps/app-routes.js"
import home from "./routes/home/home.js";
const __dirname = path.resolve();
var app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(httpContext.middleware);
const httpServer = createServer(app);

//--------------------------------------------------------------------------/
//------------                   Route Initialization       ----------------/
//--------------------------------------------------------------------------/

app.get('/',home);
// app.use("/api/v1", authUser);
app.use("/api/v1", objectRoute);
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Invalid API URL OR Invalid Request Method ',
    message: `Request OR Route  ${req.originalUrl} is not found`,
  });
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);  // Log the error stack
//   res.status(500).json({
//     error: 'This is internal server issue.Please wait it will not be resolved',
//     message: err.message || 'Something went wrong!',
//   });
// });
//--------------------------------------------------------------------------/

//------------------------------Error Handling------------------------------/
app.use(errorHandler);
//--------------------------------------------------------------------------/

export { httpServer };
