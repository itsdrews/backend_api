require("dotenv/config")
require("express-async-errors");



const express = require("express"); 
const routes = require("./routes/index");

const cors = require("cors");
const corsOptions ={
   origin:"http://localhost:5173 ", 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const app = express();
app.use(cors());

const AppError = require("./utils/AppError");

const migrationsRun = require("./database/sqlite/migrations");

const uploadConfig = require("./configs/upload");

migrationsRun();   
 
 app.use(express.json());
 
 app.use("/files",express.static(uploadConfig.UPLOADS_FOLDER));

 app.use(routes);
 app.use(cors(corsOptions))
 
 
 app.use((error,request,response,next) => {
   
   if(error instanceof AppError){
      return response.status(error.statusCode).json({
         statusCode: "error",
         message: error.message

      });
   }

   console.error(error);

   return response.status(500).json({
      status:"error",
      message: "Internal Server Error"
   })


 });



 const PORT = process.env.PORT || 3333;
 app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));