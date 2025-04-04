/// ------- INITIALIZATIONS ------- \\\
const express = require("express");
const { mongo } = require("mongoose");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();
const Posts = require("./models/posts");
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
    const posts = await Posts.find();
    console.log(posts);
    if (page === undefined)
    {
        page = "home";
    }

    response.render("layout", {
        page,
        posts
    });
});

// posts route
server.get("/:id", async (request, response) => {
    const { id } = request.params;
    page = "singlePost";
    try {
        const post = await Posts.findById(id);
        response.render("layout", { post, page });
    }
    catch (error) {
        console.log(error);
        response.status(500).render("404", { error });
    }
});