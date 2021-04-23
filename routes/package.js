var express = require('express');
const package_controlers= require('../controllers/package');
var router = express.Router();

// A little function to check if we have an authorized user and continue on
//or redirect to login.
const secured = (req, res, next) => {
    if (req.user){
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}
/* GET package */
router.get('/', package_controlers.package_view_all_Page );
module.exports = router;

/* GET detail package page */
router.get('/detail', package_controlers.package_view_one_Page);


/* GET create package page */
router.get('/create',secured, package_controlers.package_create_Page);

/* GET update page */
router.get('/update',secured, package_controlers.package_update_Page);

/* GET delete package page */
router.get('/delete',secured, package_controlers.package_delete_Page);