const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/register', (req, res) => {
    res.render('users/register');
});
//register user w/ passport
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashPass = await bcrypt.hash(password, 10)
        const user = new User({ 
            email: email,
            password: hashPass,
            name: name,
        });
        const registeredUser = await user.save(user);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to SOTS');
            res.redirect('/');
        })
    } catch (e) {
        console.log(e)
        req.flash('error', e.message)
        res.redirect('register')
    }
});
router.get('/login', (req, res) => {
    res.render('users/login');
})

// login/logout routes using bcrypt
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log('User: ', user)
        if(user){
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if(cmp){
                req.login(user, err => {
                    if(err) return next(err);
                    req.flash('success', `Welcome back, ${user.name}!`);
                    res.redirect('/');
                })
            }
        }
    } catch (e) {
        console.log('Error: ', e);
    }
}
);

router.get('/logout', (req, res) => {
    req.logout();
    console.log('logged out');
    req.flash('success', 'Goodbye!');
    res.redirect('/');
})
module.exports = router;