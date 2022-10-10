//Importing EXPRESS since NODE JS doesn't support IMPORT instead we use key word (require)
const express = require("express");

//Enviroment Variables are defined on the .ENV file that should be included on root of the app, need to run npm i doteenv
//Import (require) require('dotenv').config();
require("dotenv").config();

//Importing CORS
const cors = require("cors");

//Importing DataBase
const { dbConnection } = require("./database/config");

//Creating EXPRESS Server
const app = express();

//Base de Datos
dbConnection();

//Setting up CORS
app.use(cors());

//Public Directory (Middleware)
//express.static received the link/directory to be redirectioned to.
app.use(express.static("public"));

//Parsing and reading body
app.use(express.json());

//****ROUTES****//
//*EndPoints*//
//Routes are imported from the routes directory, and middleware is handling using app.use
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//Setting server to listen for request and petitions.
// process.env.PORT = port to be listened to.
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
