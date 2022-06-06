const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: false },
	businessName: { type: String, required: false },
	businessAddress: { type: String, required: false },
	lastName: { type: String, required: false },
	email: { type: String, required: true },
	password: { type: String, required: true },
	category:{ type: String, required: true },
	verified:{type:Boolean,default:false},
	isActive:{type:Boolean,default:true}

	
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
		firstName: Joi.string().label("First Name"),
		businessName: Joi.string().label("Business Name"),
		businessAddress: Joi.string().label("Business Address"),
		lastName: Joi.string().label("Last Name"),
		email: Joi.string().email().label("Email"),
		password: passwordComplexity().label("Password"),
		category: Joi.string().label("Category"),
		verified:Joi.string().label("Verified"),
		isActive:Joi.string().label("Active")
	});
	return schema.validate(data);
};

module.exports = { User:User
	, validate
};

