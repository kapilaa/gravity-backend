import swaggerUi from 'swagger-ui-express';
import SwaggerUtil from '../lib/SwaggerUtil.js';
import { geAuthSwaggerUI } from './auth/index.js';

async function swaggerFunction(app){
     
      //--------------------------------------------------------------------------/
      //------------                   Swagger integration        ----------------/
      //--------------------------------------------------------------------------/
                        var swaggerUtil = new SwaggerUtil();
                        await geAuthSwaggerUI(swaggerUtil);
            app.use("/api-docs", swaggerUi.serve);
            app.get("/api-docs", swaggerUi.setup(swaggerUtil.getDocument()));
             console.log(swaggerUtil.getDocument());
             
      //--------------------------------------------------------------------------/
      //--------------------------------End---------------------------------------/  
      //--------------------------------------------------------------------------/     
           
}

export {swaggerFunction}