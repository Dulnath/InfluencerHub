const express = require('express');
const router = express.Router();

const NewUsers = require('../../models/NewUsers');

router.get('/',(req,res) => {
    NewUsers.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

module.exports = router;