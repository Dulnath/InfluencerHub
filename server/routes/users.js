const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const userModel= require("../models/user");
const ReportedAccounts = require('../models/ReportedAccounts');




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
router.post('/report', async (req, res) => {
    try {
        await ReportedAccounts.create({
            accountID: req.body.accountID,
            firstName: req.body.firstName,
            description: req.body.description,
            date: req.body.date
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})


//User.find( { $or: [ { category: "Influencer" || "influencer"} ] } )
const {
  AddUsers,
  EmailVerify,
  getById,
  getUsers,
  UpdateUser,
} = require("../controller/users");

//user registration routes
router.post("/", AddUsers);
router.get("/getUsers", getUsers);
router.get("/:id/verify/:token/", EmailVerify);
router.get("/getuser/:id", getById);
router.put("/getuser/:id", UpdateUser);

module.exports = router;
