const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAccount = require('../../models/UserAccount');


router.get('/',(req,res) => {
    UserAccount.find()
        .sort({date:-1})
        .then(items => res.json(items))
});

router.post('/', async (req, res) => {
	console.log(req.body)
	try {
		const nupassword = req.body.password;
		const salt = bcrypt.genSaltSync(11);
		const newPassword = await bcrypt.hash(nupassword, salt);
        console.log(newPassword);
		await UserAccount.create({
			firstName: req.body.fname,
            lastName: req.body.lname,
			email: req.body.email,
            phoneNo: req.body.contactNo,
            type:'admin',
            isActive:'true',
			isFirstLogin:'true',
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error'});
		console.log(err);
	}
})

router.post('/login', async (req, res) => {
	const user = await UserAccount.findOne({
		email: req.body.email,
		userName: req.body.firstName
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (isPasswordValid) {
		const login = user.isFirstLogin;
		const token = jwt.sign(
			{
				id: user._id,
				name: user.firstName,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token, test: login})
	} else {
		return res.json({ status: 'error', user: false })
	}
})

router.put('/firstlogin/:id',async (req,res) =>{
	try{
		const password = req.body.password;
		console.log(password);
		const salt = bcrypt.genSaltSync(10);
		const newPassword = await bcrypt.hash(password, salt);
		console.log(newPassword);
		await UserAccount.findByIdAndUpdate(req.params.id,{
			password: newPassword,
			isFirstLogin:'false'
		},res.json({ status: 'ok' }))
	}catch(err){
		res.json({ status: 'error'});
		console.log(err);
	}
	
		
})

module.exports = router;