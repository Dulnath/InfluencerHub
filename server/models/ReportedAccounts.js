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

const ReportedAccountSchema = new Schema({
    accountID:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    phoneNo: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date: {
        type:String,
        default:FormatDate(Date.now())
    }
});

module.exports = ReportedAccounts = mongoose.model('ReportedAccounts',ReportedAccountSchema);

