// -------- INITIALIZATIONS -------- \\
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SCHEMA
const musicSchema = new Schema ({
    songName: {
        type: String,
        required: true,
    },
    songDate: {
        type: Number,
        required: true,
    },
    songLink: {
        type: String,
        required: true,
    },
});

// -------- EXPORTING -------- \\
const Music = mongoose.model("Music", musicSchema, "music");
module.exports = Music;