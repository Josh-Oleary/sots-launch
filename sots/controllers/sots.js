const Report = require('../models/report');

module.exports.renderIndex = (req, res) => {
  res.render('index');
};

module.exports.renderTeam = (req,res) => {
  res.render('team');
};

module.exports.renderContact = (req,res) => {
  res.render('contact');
};

module.exports.renderNelson = (req, res) => {
  Report.find({}, (err, nelsonReports) => {
      if(err){
          console.log(err)
      } else {
          res.render('locations/nelson', {reports: nelsonReports})
      }
  })
}

module.exports.renderRosland = (req, res) => {
  Report.find({}, (err, roslandReports) => {
      if(err){
          console.log(err)
      } else {
          res.render('locations/rosland', {reports: roslandReports})
      }
  })
}