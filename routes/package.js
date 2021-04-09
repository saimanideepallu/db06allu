var express = require('express');
const package_controlers= require('../controllers/package');
var router = express.Router();
/* GET costumes */
router.get('/', package_controlers.package_view_all_Page );
module.exports = router;