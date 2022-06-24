const express = require("express");
const Payment = require("../models/Payments");
const router = express.Router();



router.post('/createPayment', async(req, res) => {
   const{paidto,iid,bid,project,time,amount,paidby}=req.body
   let payment;
    try {
         payment =  new Payment({
            paidto:paidto,
            influencerId:iid,
            paidby: paidby,
            businessId:bid,
            project:project,
            time:time,
            amount:amount
        })
await payment.save();
        res.json({ status: 'ok',dfd:`${payment.influencerId}` })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
     
    }
})

//Retrieve all events
router.get("/getPayment", async(req, res) => {
    let payments;
    try{
        payments = await Payment.find();
    }catch(err){
        console.log(err)
    }
    if(!payments){
        res.status(400).json({message:"No products found"})
    }
    return res.status(200).json({ payments })
});

// Retrieve a specific event
// router.get("/getEvent/:id", (req,res) => {
    
//     let eventId = req.params.id;

//     eventModel.findById(eventId,(err,event) => {
//         if(err){
//             return res.status(400).json({success:false, err});
//         }
//         return res.status(200).json({
//             success:true,
//             event
//         });
//     });
// });

// // Update an event
// router.put('/updateEvent/:id',(req,res) => {
//     eventModel.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set:req.body
//         },
//         (err,updatedEvent) => {
//             if(err){
//                 return res.status(400).json({error:err});
//             }

//             return res.status(200).json({
//                 success:"Updated succesfully"
//             });
//         }
//     );
// });

// // Delete an event
// router.delete('/deleteEvent/:id',(req,res) => {
//     eventModel.findByIdAndRemove(req.params.id).exec((err,deletedEvent) => {
//         if(err) return res.status(400).json({
//             message:"Delete unsuccessful",err
//         });

//         return res.json({
//             message:"Delete successful",deletedEvent
//         });
//     });
// });
module.exports = router;