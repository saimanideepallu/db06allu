var package = require('../models/package');
// List of all package
exports.package_list = async function(req, res) {
    try{
    thepackage = await package.find();
    res.send(thepackage);
    }
    catch(err){
    res.error(500,`{"error": ${err}}`);
    }
    };
// for a specific Costume.
exports.package_detail = async function(req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await package.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Costume create on POST.
exports.package_create_post = async function(req, res) {
    console.log(req.body)
    let document = new package();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costumetype":"goat", "cost":12, "size":"large"}
    document.mode = req.body.mode;
    document.price = req.body.price;
    document.quantity = req.body.quantity;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.error(500,`{"error": ${err}}`);
    }
};
// Handle package delete form on DELETE.
exports.package_delete = function(req, res) {
res.send('NOT IMPLEMENTED: package delete DELETE ' + req.params.id);
};
//Handle Costume update form on PUT.
exports.package_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await package.findById( req.params.id)
        // Do updates of properties
        if(req.body.mode) toUpdate.mode = req.body.mode;
        if(req.body.price) toUpdate.price = req.body.price;
        if(req.body.quantity) toUpdate.quantity = req.body.quantity;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// VIEWS
// Handle a show all view
exports.package_view_all_Page = async function(req, res) {
  try{
      thepackage = await package.find();
      res.render('package', { title: 'Package Search Results', results: thepackage });
    }
    catch(err){
        res.error(500,`{"error": ${err}}`);
    }
};