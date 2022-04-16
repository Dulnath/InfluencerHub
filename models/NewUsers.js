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

const NewUserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
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
    type:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    isActive:{
        type:Boolean,
        required:true
    },
    date: {
        type:String,
        default:FormatDate(Date.now())
    }
})

module.exports = Comments = mongoose.model('NewUsers',NewUserSchema)