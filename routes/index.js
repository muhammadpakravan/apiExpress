const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const newsSchema = require('../models/news')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'news API with NODE JS mother Fucker :|' });
});

module.exports = router;
