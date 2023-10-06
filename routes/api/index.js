const express = require('express');
const getNaverBlogs = require('./n_blog.api');
const router = express.Router();

router.get('/naver', getNaverBlogs);

module.exports = router;
