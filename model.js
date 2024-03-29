// To access the file called auth.js
const auth = require("./assets/auth.js");

const mongoose = require("mongoose");
const md5 = require("md5"); // To hash the incoming hash. Hash is a unique finger print for a file as it is.

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

/*
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
*/

/* Previous attempt
async function searchDB(searchCriteria){
    return new Promise((resolve, reject) => {
        accountModel.find(searchCriteria, (error, results) => {});
    });
}
*/

async function checkLogin(username, password) {
    let hashedAndSaltedPassword = md5(password + auth.getSalt());
    console.log(hashedAndSaltedPassword); // Looking for a matching hash from the database (mongoDB Atlas > collections)

    let searchCriteria = {
        username: username,
        password: hashedAndSaltedPassword
    };

    return accountModel.find(searchCriteria).exec();
}

async function createAccount(newAccount){

    // let returnValue = null;

    // FIX
    return checkLogin(newAccount.username, newAccount.password).then((results) => {

        if(results.length >= 1){
            return null;
        }else {
            let account = new accountModel({
                fname: newAccount.fname,
                lname: newAccount.lname,
                username: newAccount.username,
                email: newAccount.email,
                password: md5(newAccount.password + auth.getSalt()),
                creationDate: new Date(),
                lastLogin: new Date(),
                projectID: Math.floor((Math.random() * 1000000) + 1)
            });

            // FIX
            let temp = account.save();
            console.log(temp);
            return temp;
        }
    });
    // console.log(returnValue);
    // return returnValue;

}

module.exports = {
    checkLogin: checkLogin,
    createAccount: createAccount
}