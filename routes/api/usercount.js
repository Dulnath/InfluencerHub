const express = require('express');
const router = express.Router();
const UserCount = require('../../models/UserCount');

router.get('/', (req, res) => {
    UserCount.find()
        .then(items => res.json(items))
});

module.exports = router;