/// ------- INITIALIZATIONS ------- \\\
const express = require("express");
const { mongo } = require("mongoose");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();
const Music = require("./models/music");
const port = 3000;
const { DB_URI } = process.env;
//debug
console.log(DB_URI);

/// ------- MIDDLEWARE ------- \\\
server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

/// ------- CONNECTION ------- \\\
mongoose
    .connect(DB_URI)
    .then(() => 
        server.listen(port, () => {
            console.log(`Connected to Databse ${mongoose.connection.name}\nServer is listening on port ${port}`);
            })).catch((error) => console.log(error));

/// ------- ROUTES ------- \\\

// index
server.get("/", async (request, response) => {
    let { page } = request.query;
    const music = await Music.find();

    if (page === undefined)
    {
        page = "home";
    }

    response.render("layout", {
        page,
        music
    });
});