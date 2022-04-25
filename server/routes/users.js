const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		let userRes = {
			email: req.body.email,
			password: hashPassword,
			category:req.body.category
		};
	
		if(req.body.category==="influencer")

		{
			userRes = {
				...userRes,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			}
		}
		else if(req.body.category==="business")
		{
			userRes = {
				...userRes,
				businessName: req.body.businessName,
				businessAddress: req.body.businessAddress,
			 }
		}
		console.log("error")
		await new User(userRes).save();
		res.status(201).send({ message: "User created successfully" });
	
	} catch (error) {
		res.status(500).send({ message: "Internal Serversdfsadf Error",error });
	}
});

module.exports = router;
