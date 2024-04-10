const Store = require('../models/Store')



// @access: public
// @request-type: GET 
// @URI: /api/v1/stores
// to get stores from db
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find();

        return res.status(203).json({
            success: true,
            count : stores.length,
            data : stores // array
        });
    } catch (error) {
        console.error(error);
        res.status(500),json({error: "Server error sorry"})
    }
};


// @access: public
// @request-type: POST 
// @URI: /api/v1/stores
// to add stores to the db
exports.addStore = async (req, res, next) => {
    try {
        const store  = await Store.create(req.body);
        return res.status(203).json({
            success: true,
            data : store
        });
    } 
    catch (error) {
        console.error(error);
        if(error.code === 11000){ return res.status(400).json({msg: 'Store Id already exists'}) }
        res.json({error: "Something Went Wrong"})
     }
}