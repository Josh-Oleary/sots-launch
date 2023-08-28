const Report = require('../models/report');
const User = require('../models/user');
const multer = require('multer');
const { storage } = require('../cloudinary');


module.exports.renderAdmin = (req, res) => {
  res.render('admin/home')
};

module.exports.renderAddReport = (req, res) => {
  res.render("admin/addReport")
};

module.exports.addReport =  async (req,res) => {
  console.log('REQ USER: ', req.user)
  try {
      const { date, location, weatherSummary, snowpackSummary, avalancheSummary } = req.body;
      const report = new Report({ date, location, weatherSummary, snowpackSummary, avalancheSummary });
      report.video = req.files.map(f => ({url: f.path, filename: f.filename}));
      console.log(req.user)
      // report.author = req.user._id;
      console.log(report);
      await report.save((err, doc) => {
          if(err) console.log(err);
          console.log(doc);
      })
      res.redirect('/');
  } catch (e) {
      console.log(e);
  }
};


module.exports.renderOwner = (req, res) => {
  res.render('admin/owner')
};

module.exports.makeAdmin = async (req, res) => {
  try{
  const email = req.body.makeAdminEmail;
  console.log(email);
  const filter = { email: email }
  const update = { isAdmin: true };
  let updatedUser = await User.findOneAndUpdate(filter, update, { new: true});
  console.log(updatedUser);
  res.send(`Successfuly made ${updatedUser.name} and admin`)
  } catch (e) {
      console.log(e);
  }
};

module.exports.removeAdmin = async (req, res) => {
  try {
  const email = req.body.deleteAdminEmail;
  const filter = { email: email }
  const update = { isAdmin: false };
  let updatedUser = await User.findOneAndUpdate(filter, update, { new: true});
  console.log(updatedUser);
  res.send(`${updatedUser.name} is no longer an Admin`);
  } catch (e) {
      console.log(e);
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
      next();
      return;
  }
  req.flash('error', 'You are not an admin!')
  res.redirect('/')
};