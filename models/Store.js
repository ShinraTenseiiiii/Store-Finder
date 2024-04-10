const mongoose = require('mongoose');

const geocoder = require('../utils/geocoder');

var StoreSchema = new mongoose.Schema({
    storeId : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        maxlength: [10,"StoreId must be within 10 characters"]
    },
    address: {           // GeoCoder turns the address into location object to be saved into the db
        type : String,
        required : true
    },
    location: {
        type: {
          type: String,
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
})


// Geocode and crate loaction from address

StoreSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  
  this.address = undefined; // not to save address


  next();
});


module.exports = mongoose.model('Store', StoreSchema)