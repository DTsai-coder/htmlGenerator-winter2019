// How to create an Express server
const express = require("express");

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

console.log("Express server is running on port " + port + "!");
