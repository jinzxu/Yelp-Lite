const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn, validateSite, isAuthor } = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const Site = require('../models/campground');
const Review = require('../models/review');
const multer = require('multer'); //multer is a middleware for handling multipart/form-data, primarily used for uploading files 
const { storage } = require('../cloudinary'); //our image cloud library
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateSite, catchAsync(campgrounds.createSite));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showSite))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateSite, catchAsync(campgrounds.updateSite))
    .delete(isAuthor, catchAsync(campgrounds.deleteSite));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;