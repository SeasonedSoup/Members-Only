const express = require("express");
const path = require("node:path");
const router = require("./routes/userRoute")

const app = express();

app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = 3000;

app.use('/', router);

app.listen((PORT), (error) => {
    if (error) {
        throw error;
    }

    console.log("App is listening at port 3000 visit here http://localhost:3000/")
})

