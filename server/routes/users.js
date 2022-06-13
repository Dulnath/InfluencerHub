const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const userModel= require("../models/user");


//signup
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//email verification link
router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


//get all the users
router.get('/getUsers', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});



//get individual user
router.get("/getuser/:id", (req, res) => {
	let userID = req.params.id;
	User.findById(userID, (err, user) => {
	  if (err) {
		return res.status(400).json({ success: false, err });
	  }
	  return res.status(200).json({
		success: true,
		user,
	  });
	});
  });

//search user using firstName
router.get("/search/:key",async(req,res)=>{
	//console.log(req.params.key)

	let data = await User.find(
		{
			"$or":[
			{firstName :{$regex:req.params.key,$options:'i'}},
			{lastName :{$regex:req.params.key,$options:'i'}},
			]
		}
	)
	res.send(data)

	
})

/*

router.get("/search1/:key",async(req,res)=>{
	//console.log(req.params.key)

	let data = await User.find(
		{
			"$or":[
				{ category: "Influencer" || "influencer"} 
				//{category:{$regex:req.params.key.toLowerCase()}}
			]
		}
	)
	res.send(data)

	
})
*/

router.get('/:id', async(req, res) => {
    try {
        User.findById(req.params.id, (result, err) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result.data);
            }

        });
    } catch (err) {
        res.json(err);
    }
})


// Report a user
router.put('/addReport/:id', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        {
            description: req.body.description,
            isVisible: false
        },
        (err, updatedUser) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated succesfully"
            });
        }
    );
});



//User.find( { $or: [ { category: "Influencer" || "influencer"} ] } )
module.exports = router;
