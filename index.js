import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));


function passwordCheck(req, res, next) {
    const password = req.body["password"];
    console.log(password);

    if (password !== "helloWorld") {
        userIsAuthorised = false;
        // alert("Wrong Password")
    }
    if (password === "helloWorld") {
        userIsAuthorised = true;
        console.log(userIsAuthorised);
    }
    next();
}

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.post("/check", (req, res) => {
    if (userIsAuthorised) {
        res.sendFile(__dirname + "/public/passwords.html");
    }

    else {
        res.sendFile(__dirname + "/public/index.html");
    }

});



app.listen(3003, () => {
    console.log("server started at port 3003");
});