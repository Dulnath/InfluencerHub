const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const NewUsers = require('../models/NewUsers');

router.get('/',(req,res) => {
    NewUsers.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

router.delete('/:id',(req,res,next) => {
    NewUsers.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = router;