const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    district: {
        type:String,
        required:false
    },
    city: {
        type:String,
        required:false
    },
    streetNo: {
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
        default:Date.now
    }
});

module.exports = ReportedAccounts = mongoose.model('ReportedAccounts',ReportedAccountSchema);