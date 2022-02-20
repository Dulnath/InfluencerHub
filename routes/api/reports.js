const express = require('express');
const router = express.Router();
const ReportedAccounts = require('../../models/ReportedAccounts');
const ReportedComments = require('../../models/ReportedComments');

router.get('/reportedaccounts',(req,res) => {
    ReportedAccounts.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

router.get('/reportedcomments',(req,res) => {
    ReportedComments.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

module.exports = router;

