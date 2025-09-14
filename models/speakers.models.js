const mongoose= require("mongoose");

const speakerSchema= new mongoose.Schema({
    imageUrl:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    speakerType:{
        type: String,
        required: true,
    },
});

const Speaker= mongoose.model("Speaker", speakerSchema);

module.exports= Speaker;

