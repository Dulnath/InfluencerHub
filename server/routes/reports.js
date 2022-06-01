const express = require('express');
const router = express.Router();
const ReportedAccounts = require('../models/ReportedAccounts');

//display reported accounts
router.get('/reportedaccounts',(req,res) => {
    ReportedAccounts.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

//delete accountReport
router.delete('/reportedaccounts/delete/:id',(req,res)=>{
    ReportedAccounts.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.json({status:'error'});
        }else{
            res.json({status:'ok'});
        }
    })
})

module.exports = router;

