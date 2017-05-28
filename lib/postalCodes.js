const fs = require('fs');
const lunr = require('lunr');

let index = null;
let data = {};

module.exports.init = function(filePath) {
  let file = fs.readFileSync(filePath, 'utf8');
  let fileEntries = file.split('\n');
  let jsonEntries = fileEntries
                .map(fileEntry => {
                  let fields = fileEntry.split('\t');
                  let jsonEntry = {
                    countryCode: fields[0],
                    postalCode: fields[1],
                    placeName: fields[2],
                    adminName1: fields[3],
                    adminCode1: fields[4],
                    adminName2: fields[5],
                    adminCode2: fields[6],
                    adminName3: fields[7],
                    adminCode3: fields[8],
                    latitude: fields[9],
                    longitude: fields[10],
                    accuracy: fields[11]
                  }
                  return jsonEntry;
                })
                .filter(entry => { return entry.postalCode; });

  this.index = buildIndex(jsonEntries);
};

function buildIndex(jsonEntries) {
  jsonEntries.forEach(function (entry) {
    data[entry.postalCode] = entry;
  });

  return lunr(function () {
    this.pipeline.remove(lunr.stopWordFilter);
    this.pipeline.remove(lunr.stemmer);
    this.ref('postalCode');
    this.field('countryCode');
    this.field('postalCode');
    this.field('placeName');
    this.field('adminName1');
    this.field('adminCode1');
    this.field('adminName2');
    this.field('adminCode2');
    this.field('adminName3');
    this.field('adminCode3');

    jsonEntries.forEach(function (entry) {
      this.add(entry)
    }, this);
  });
}

module.exports.postalCodeExactLookup = function(postalCode) {
  return data[postalCode];
}

module.exports.postalCodeSearch = function(postalCode) {
  let results = this.index.search('postalCode:'+postalCode);
  let entries = results.map(result => {
    return data[result.ref];
  })
  return entries;
}

module.exports.placeNameSearch = function(placeName) {
  let results = this.index.search(placeName);
  let entries = results.map(result => {
    return data[result.ref];
  })
  return entries;
}
