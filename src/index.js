import dotenv from "dotenv";
import { httpServer } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});
 
const startServer = () => {
        httpServer.listen(process.env.PORT || 8080, () => {
            console.log('\t\t --------             Starting Server FOR Gravity-Task-Sheet              ------------------')
            console.log(`\t\t --------             Port: ${process.env.PORT || 8181}       \t\t\t\t     ------------------`)
            console.log(`\t\t --------             Database: MongoDB                              ------------------`)
            console.log(`\t\t --------             Modules: Node,Express,JWT                      ------------------`)        
            console.log(`\t\t --------             Ruuning Node File: index.JS                    ------------------`)
            console.log(`\t\t --------             Env Mode: ${process.env.NODE_ENV}  \t\t             ------------------`)
      });
};

  async function ServerStarts(){
    try {
      await connectDB();
      connectDB();
      startServer();
    } catch (err) {
      console.log("Mongo db connect error: ", err);
    }
  }
  ServerStarts()


