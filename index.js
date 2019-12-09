// To import the model.js file
const model = require("./model.js");

// How to create an Express server
const express = require("express");

const bodyParser = require("body-parser");

// Run the Express Server
const app = express();

// Feed Express server to the HTTP package
// HTTP Request is a signal sent to database
const http = require("http").Server(app); // .Server is a class and (app) is an argument 

// Normal webpage port is Port:80
// Development(server) webpage port is Port: 8080

// port 3000 is node's default server.
// Type localhost:3000 in the web browser to get: Cannot GET/
const port = 3000;

// Tell HTTP to which port to listen to.
http.listen(port); // .listen is a method that tells http what port to listen to.

console.log("Express server running on " + port);

// To load the index.html, use code bellow:
// Routes
app.use(express.static("client/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/login", (request, response) => {

  
  if (request.body.type === "login"){

    let requestUsername = request.body.username;
    let requestPassword = request.body.password;

    // console.log(requestPassword); // Password made it to the backend (terminal)

    model.checkLogin(requestUsername, requestPassword).then((results) => {
        console.log(results);
        console.log(requestUsername + " Inside of Promise");
        if(results.length === 1){
            response.send({success: 0});
        }else{
            response.send({success: 1});
        }
    });
  }else if(request.body.type === "registration"){
      model.createAccount(request.body).then((results) => {
          if(results === null){
              response.send({success: 2});
          }else{
              response.send({success: 3});
          }
          //response.sendStatus(200); // This response is used to send back to front-end.
      }).catch((error) => {
          console.log(error);
          response.send({success: 4});
      });
  }

    // response.sendStatus(200);
});

