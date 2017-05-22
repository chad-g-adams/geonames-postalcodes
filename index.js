'use strict'

let postalCodes = require('./lib/postalCodes');

module.exports.init = postalCodes.init;

module.exports.postalCodeExactLookup = postalCodes.postalCodeExactLookup;
module.exports.postalCodeSearch = postalCodes.postalCodeSearch;
module.exports.placeNameSearch = postalCodes.placeNameSearch;
