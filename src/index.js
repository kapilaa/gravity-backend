import dotenv from "dotenv";
import { httpServer } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});
 
const startServer = () => {
  const appEnviroment=`${process.env.NODE_ENV}`;
  const appPORT=`${process.env.PORT || 8181}`;
  const appUrl=`http://localhost:${appPORT||8181}`;
  const dbType=process.env.DB_LIVE_MODE==true?"LIVE":"LOCAL";

            httpServer.listen(process.env.PORT || 8080, () => {
            console.log('\t\t --------  Starting Server FOR My Task                       ------------------')
            console.log(`\t\t --------  Port:   ${appPORT}     \t\t\t\t     ------------------`)
            console.log(`\t\t --------  DATABASE TYPE: ${dbType}\t\t\t             ------------------`)
            console.log(`\t\t --------  Database: MongoDB                                 ------------------`)
            console.log(`\t\t --------  Modules: Node,Express,JWT                         ------------------`)        
            console.log(`\t\t --------  Ruuning Node File: index.JS                       ------------------`)
            console.log(`\t\t --------  Env Mode:   \t\t  ${appEnviroment}                ------------------`)
            console.log(`\t\t --------  Application is running on: ${appUrl}  ------------------`)
      });

};

  async function ServerStarts(){
    try {
      await connectDB();
      startServer();
    } catch (err) {
      console.log("Mongo db connect error: ", err);
    }
  }
  ServerStarts()


