const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require("./models/user");
const UserCount = require('./models/UserCount');
const useraccounts = require('./routes/user');
const reports = require('./routes/reports');
const usercount = require('./routes/usercount');
const comments = require('./routes/comments')
const req = require('express/lib/request');
const connection = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

connection();

//use api
app.use('/api/useraccounts', useraccounts);
app.use('/api/reports', reports);
app.use('/api/comments',comments);
app.use('/api/usercount', usercount);
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 5000;

function getUserCount() {
    var query = User.find();
    var timeNow = FormatDate(Date.now());
    query.count(function(err, count) {
        if (err) {
            console.log(err);
        } else {
            try {
                UserCount.create({
                    userCount: count,
                    time: timeNow
                })
            } catch (err) {
                console.log(err);
            }
            console.log("Count is", count)
        }
    });
}

function FormatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minuite = d.getMinutes();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day, hour, minuite].join('-');
}


app.get("/", function(req, res) {
    res.json({ message: "Greetings from the server" });
})

app.listen(port, () => {
    console.log(`server started on port ${port}`);
    //setInterval(getUserCount,60000);
});