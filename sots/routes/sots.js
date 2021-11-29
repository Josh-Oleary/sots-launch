const express = require('express');
const router = express.Router();
const Report = require('../models/report');
const sots = require('../controllers/sots');

//routes for rendering static pages
router.get('/', sots.renderIndex );
router.get('/team', sots.renderTeam );
router.get('/contact', sots.renderContact );
//route for reaching nelson report page
router.get('/nelson', sots.renderNelson );
router.get('/rosland', sots.renderRosland );

module.exports = router;