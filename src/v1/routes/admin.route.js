const express = require('express');
const router = express();
//const { SERVER, APP_NAME, JWT } = require('../utils/constants.util')

const  userCompostion  = require(`../controllers/userComposion`)

router.get('/', userCompostion.book_list); 

module.exports = router