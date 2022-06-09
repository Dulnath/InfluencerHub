const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const cors = require('cors');
//const passwordComplexity = require("joi-password-complexity");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: false },
	businessName: { type: String, required: false },
	businessAddress: { type: String, required: false },
	lastName: { type: String, default:'' },
	email: { type: String, required: true },
	phoneNo:{type:String, required:true},
	password: { type: String, required: true },
	category:{ type: String, required: true },
	isFirstLogin:{type:Boolean,required:false},
	adminVerified:{type:Boolean,default:false},
	suspendedDate:{type:Date,required:false},
	restoreDate:{type:Date,required:false},
	verified:{type:Boolean,default:false},
	isActive:{type:Boolean,default:true},
	status:{ type: String, required: false },
	img:{ type: String, required: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id,category:this.category,adminVerified:this.adminVerified,isFirstLogin:this.isFirstLogin,email:this.email }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		category:Joi.string().required().label("Category"),
		status: Joi.string().required().label("Status"),
		img: Joi.string().required().label("Image"),
	});
	return schema.validate(data);
};



module.exports = { User:User
	, validate
};

//module.exports = User = mongoose.model('user',userSchema);
//module.exports = User, {validate};

