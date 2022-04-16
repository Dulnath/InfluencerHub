const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function FormatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

const ReportedCommentsSchema = new Schema({
    text:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    repType:{
        type:String,
        required:true
    },
    cFname:{
        type:String,
        required:true
    },
    cLname:{
        type:String,
        required:true,
    },date: {
        type:String,
        default:FormatDate(Date.now())
    }
    
})

module.exports = ReportedComments = mongoose.model('ReportedComments',ReportedCommentsSchema);