const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const admin = require('../controllers/admin')


// middleware to check if user is admin
// router.use('/', admin.isAdmin )
// routes for the admin section of the site
router.get('/', admin.renderAdmin )

router.route('/addReport')
    .get( admin.renderAddReport )
    .post( upload.array('video', 1), admin.addReport )

router.route('/owner')
    .get( admin.renderOwner )
    .post( admin.makeAdmin )
    .put( admin.removeAdmin )

module.exports = router;