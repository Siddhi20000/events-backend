const mongoose= require("mongoose");

const eventSchema= new mongoose.Schema({
    eventType:{
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    hostedBy:{
        type: String,
        required: true,
    },
    details:{
        type: String,
        required: true,
    },
    dressCode:{
        type: String,
        required: true,
    },
    ageRestrictions:{
        type: String,
        required: true,
    },
    eventTags:[{
        type: String,
        required: true,
    }],
    author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speaker", // must match the model name
    },
  ],
},
{
    timestamps: true,
},
);

const Event= mongoose.model("Event", eventSchema);

module.exports= Event;



