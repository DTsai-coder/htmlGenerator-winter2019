// To access the file called auth.js
const auth = require("./assets/auth.js");

const mongoose = require("mongoose");
const md5 = require("md5"); // To hash the incoming hash. Hash is a unique finger print for a file as it is.
let authenticated = -1;

const options ={
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
// Error for connecting
mongoose.connect(auth.getDBURL(), options, (error) => {
    if(error){
        console.log("Something happened at MongoDB Headquarters: " + error.reason);
    }else{
        console.log("Connected to MongoDB Atlas!");
    }
});

// Error for sending and receiving
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB Connection Error: "));

mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let accountSchema = new Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    password: String,
    creationDate: Date,
    lastLogin: Date,
    projectID: String
});

let accountModel = new mongoose.model("accounts", accountSchema);

function checkLogin(username, password){
    let hashedAndSaltedPassword = md5 (password + auth.getSalt());

    let searchCriteria = {
        username: username,
        password: hashedAndSaltedPassword
    };

    accountModel.find(searchCriteria, (error, results) => {
        if(error){
            console.log(error.reason);
        }else{
            if(results.length === 0){
                updateAuthentication(false);
            }else if(results.length === 1){
                updateAuthentication(true);
            }else{
                updateAuthentication(-1);
            }   
        }
    }).then(() => {return authenticated;});
}

function updateAuthentication(value){
    authenticated = value;
}

module.exports = {
    checkLogin: checkLogin
}