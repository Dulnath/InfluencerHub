const express = require('express');
const router = express.Router();
const Comments = require('../models/Comments')

//display reported comments
router.get('/reportedcomments',(req,res) => {
    Comments.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

router.put('/restorecomment/:id', async (req,res)=>{
    try{
        console.log('comment restored');
        await Comments.findByIdAndUpdate(req.params.id,{
            isVisible:req.body.isVisible
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
})

router.delete('/reportedcomments/delete/:id',(req,res)=>{
    Comments.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.json({status:'error'});
        }else{
            res.json({status:'ok'});
        }
    })
})

module.exports = router;