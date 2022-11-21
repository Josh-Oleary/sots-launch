const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.registerUser = async (req, res) => {
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
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};
module.exports.renderResetPassword = (req, res) => {
  res.render('users/forgot-password');
};

module.exports.loginUser = async (req, res) => {
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
};

module.exports.logout = (req, res) => {
  req.logout();
  console.log('logged out');
  req.flash('success', 'Goodbye!');
  res.redirect('/');
};