const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        default:Date.now
    }
    
})

module.exports = ReportedComments = mongoose.model('ReportedComments',ReportedCommentsSchema);