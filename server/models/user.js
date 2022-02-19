const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	verified:{type:Boolean,default:false},
	district: {type:String,required:false },
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
        default:Date.now
    }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };
