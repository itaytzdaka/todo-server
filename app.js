
//if development, load .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//npm i  express
const express = require("express"); // get express to create the server
const server = express(); // create the server

// Support JSON in the requests, let us use "req.body".
server.use(express.json());

//npm i cors
const cors = require("cors");
server.use(cors());

//use a controller
const toDosController=require("./controllers/toDos-controller");

server.use("/api/toDos", toDosController); //add router to server
server.use("/api/*", (request, response) => response.sendStatus(404)); // On any other route - return 404 error.

//npm i path
const path = require("path");

//serve static files from front-end folder, like index.html and front-end/pictures folder
server.use(express.static(path.join(__dirname, "./_front-end")));  //serve "/_front-end" folder as a root "/" route.

//serve index.html for any other route
server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./_front-end/index.html"));
});

//define the port
const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Listening on port "+ port)); // the server listening to requests now
