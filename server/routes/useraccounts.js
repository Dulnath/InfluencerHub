const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const { json } = require('express/lib/response');

//display all users
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

router.delete('/delete/:id',(req,res,next) => {
    NewUsers.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    })
});


//register new Admin
router.post('/', async(req, res) => {
    console.log(req.body)
    try {
        const nupassword = req.body.password;
        const salt = bcrypt.genSaltSync(11);
        const newPassword = await bcrypt.hash(nupassword, salt);
        console.log(newPassword);
        await User.create({
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            phoneNo: req.body.contactNo,
            category: 'admin',
            isActive: 'true',
            isVerified: 'true',
            adminVerified:'true',
            isFirstLogin: 'true',
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

router.post('/approveuser', async(req, res) => {
    try {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            type: req.body.type,
            isActive: req.body.isActive,//false -> suspended / not approved
            password: req.body.password,
            isFirstLogin: 'false'
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})


router.post('/login', async(req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' })
    }


    const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (isPasswordValid) {
        const login = user.isFirstLogin;
        const token = jwt.sign({
                id: user._id,
                name: user.firstName,
                email: user.email
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token, test: login })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

//innitial admin login
router.put('/firstlogin/:id', async(req, res) => {
    try {
        const password = req.body.passwordNew;

        const user = await User.findOne({
            email: req.body.email,
        })

        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.passwordNew,
            user.password
        );


        if (isPasswordValid) {
            console.log('duplicate password');
            return res.json({ status: 'duplicate', error: 'duplicate password' });
        } else {
            console.log(password);
            const salt = bcrypt.genSaltSync(10);
            const newPassword = await bcrypt.hash(password, salt);
            console.log(newPassword);
            await User.findByIdAndUpdate(req.params.id, {
                password: newPassword,
                isFirstLogin: 'false'
            }, res.json({ status: 'ok' }))
        }
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

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

//edit account
router.put('/updateaccount/:id', async(req, res) => {
    if (req.body.password) {
        try {
            console.log(req.body.email);
            
            const user = await User.findOne({
                email: req.body.email
            })
        
            if (!user) {
                return res.json({ status: 'error', error: 'Invalid login' })
            }
        
            const isPasswordValid = await bcrypt.compare(
                req.body.oldPassword,
                user.password
            );
            console.log(isPasswordValid);
            
            if (isPasswordValid) {
                console.log('correct old password');
                const salt = bcrypt.genSaltSync(10);
                const newPassword = await bcrypt.hash(req.body.password, salt);
                await User.findByIdAndUpdate(req.params.id, {
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    email: req.body.email,
                    phoneNo: req.body.contactNo,
                    password: newPassword
                }, res.json({ status: 'ok' }))

            }else{
                return res.json({ status: 'error', user: false })
            }
        } catch (err) {
            console.log(err);
            res.json({ status: 'error' });
        }
    } else {
        try {
            console.log('no password');
            await User.findByIdAndUpdate(req.params.id, {
                firstName: req.body.fname,
                lastName: req.body.lname,
                email: req.body.email,
                phoneNo: req.body.contactNo
            }, res.json({ status: 'ok' }))
        } catch (err) {
            console.log(err);
            res.json({ status: 'error' });
        }
    }
})

module.exports = router;