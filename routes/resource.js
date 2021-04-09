var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var package_controller = require('../controllers/package');
const package = require('../models/package');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a package.
router.post('/package', package_controller.package_create_post);
// DELETE request to delete package.
router.delete('/package/:id', package_controller.package_delete);
// PUT request to update package.
router.put('/package/:id', package_controller.package_update_put);
// GET request for one package.
router.get('/package/:id', package_controller.package_detail);
// GET request for list of all package items.
router.get('/package', package_controller.package_list);
module.exports = router;