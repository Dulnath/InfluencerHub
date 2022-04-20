const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
//signup
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
		if(req.body.category==="influencer")
		{
			await new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashPassword,
				category:req.body.category
			 }).save();
			res.status(201).send({ message: "User created successfully" });
		}
		else if(req.body.category==="business")
		{
			await new User({
				businessName: req.body.businessName,
				businessAddress: req.body.businessAddress,
				email: req.body.email,
				password: hashPassword,
				category:req.body.category
			 }).save();
			res.status(201).send({ message: "User created successfully" });

		}
	
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
