const express= require("express");
const app= express();

app.use(express.json());
const cors= require("cors");

const corsOptions={
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions)); // Allow all origins (simple fix) 

// const cors = require("cors");

// const corsOptions = {
//   origin: "https://events-frontend-fawn.vercel.app/", // only allow your frontend 
//   credentials: true,
// };

// app.use(cors(corsOptions));

const {initializeDatabase}= require("./db/db.connect");
const Event= require("./models/event.models");
const Speaker= require("./models/speakers.models");

initializeDatabase();

async function createSpeaker(newSpeaker){
    try{
        const speaker= new Speaker(newSpeaker);
        const saveSpeaker= await speaker.save();
        return saveSpeaker;
    }
    catch(error){
        throw error;
    }
}

app.post("/speakers", async(req,res)=>{
    try{
        const speakerSaved= await createSpeaker(req.body);
        res.status(201).json({message: "Speaker added successfully", speaker: speakerSaved});
    }
    catch(error){
        res.status(500).json({error: "Failed to add speaker"});
    }
})

async function createEvent(newEvent){
    try{
        const event= new Event(newEvent);
        const saveEvent= await event.save();
        return saveEvent;
    }
    catch(error){
        throw error;
    }
}

app.post("/events", async(req,res)=>{
    try{
        const savedEvent= await createEvent(req.body);
        res.status(201).json({message: "Event added successfully", event: savedEvent});
    }
    catch(error){
        res.status(500).json({error: "Failed to add event"});
    }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find()
    //console.log("Populated events:", JSON.stringify(events, null, 2));
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

async function updateEvent(eventId, dataToUpdate){
    try{
        const updatedEvent= await Event.findByIdAndUpdate(eventId, dataToUpdate, {new: true});
        return updatedEvent;
    }
    catch(error){
        console.log("Error in updating data", error);
    }
}

app.patch("/events/:eventId", async(req,res)=>{
    try{
        const updatedEvent= await updateEvent(req.params.eventId, req.body)
        if(updatedEvent){
            res.status(200).json({message: "Event Updated successfully", updatedEvent: updatedEvent});
        }
        else{
            res.status(404).json({error: "Event not found"});
        }
    }
    catch(error){
        res.status(500).json({error: "failed to update event"});
    }
});

app.get("/events/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("author");
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event details" });
  }
});


// const PORT= process.env.PORT;
// app.listen(PORT, ()=>{
//     console.log(`Server is runing on ${PORT}`);
// });

module.exports = app;





