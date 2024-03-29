const Report = require('../models/report');
const mailTransporter = require ('../controllers/mailer');

module.exports.renderIndex = (req, res) => {
  res.render('index');
};

module.exports.renderTeam = (req,res) => {
  res.render('team');
};

module.exports.renderContact = (req,res) => {
  res.render('contact');
};

module.exports.sendEmail = (req, res) => {
  let mailDetails = {
      from: req.body.email,
      to: 'jdoleary91@gmail.com',
      subject: `New message from ${req.body.fullName}`,
      text: req.body.content
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
      if(err) {
          console.log('Error Occurs');
      } else {
          console.log('Email sent successfully');
      }
    });
    res.redirect('/')
}

module.exports.renderNelson = (req, res) => {
  Report.find({ location: /nelson/i}, (err, nelsonReports) => {
      if(err){
          console.log(err)
      } else {
        nelsonReports.length > 0
          ? res.render('locations/nelson', {reports: nelsonReports.reverse(), safety: nelsonReports.reverse()[0].safety})
          : res.render('404')
      }
  })
}

module.exports.renderRosland = (req, res) => {
  Report.find({ location: /rosland/i}, (err, roslandReports) => {
      if(err){
          console.log(err)
      } else {
        roslandReports.length > 0
          ? res.render('locations/nelson', {reports: roslandReports.reverse()})
          : res.render('404')
      }
  })
}