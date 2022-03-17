const express = require('express');
const router = express.Router();
const eventModel = require('../models/Events');

router.post("/createEvent", async (req, res) => {
    const event = req.body;
    const newEvent = new eventModel(event);
    await newEvent.save();

    res.json(event);
});

router.get("/getEvent", (req, res) => {
    eventModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

router.get("/getEvent/:id", (req,res) => {
    
    let eventId = req.params.id;

    eventModel.findById(eventId,(err,event) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            event
        });
    });
});

router.put('/updateEvent/:id',(req,res) => {
    eventModel.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,updatedEvent) => {
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated succesfully"
            });
        }
    );
});

router.delete('/deleteEvent/:id',(req,res) => {
    eventModel.findByIdAndRemove(req.params.id).exec((err,deletedEvent) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });

        return res.json({
            message:"Delete successful",deletedEvent
        });
    });
});


module.exports = router;