const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAccount = require('../../models/UserAccount');
const { json } = require('express/lib/response');

//display all users
router.get('/', (req, res) => {
    UserAccount.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//register new Admin
router.post('/', async(req, res) => {
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
            type: 'admin',
            isActive: 'true',
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
        await UserAccount.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            type: req.body.type,
            isActive: req.body.isActive,
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
    const user = await UserAccount.findOne({
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
                email: user.email,
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

        const user = await UserAccount.findOne({
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
            await UserAccount.findByIdAndUpdate(req.params.id, {
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
        UserAccount.findById(req.params.id, (result, err) => {
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
            console.log('password');
            const salt = bcrypt.genSaltSync(10);
            const newPassword = await bcrypt.hash(req.body.password, salt);
            await UserAccount.findByIdAndUpdate(req.params.id, {
                firstName: req.body.fname,
                lastName: req.body.lname,
                email: req.body.email,
                phoneNo: req.body.contactNo,
                password: newPassword
            }, res.json({ status: 'ok' }))
        } catch (err) {
            console.log(err);
            res.json({ status: 'error' });
        }
    } else {
        try {
            console.log('no password');
            await UserAccount.findByIdAndUpdate(req.params.id, {
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