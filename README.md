# geonames-postalcodes

In-memory postal code lookup and search function based on Geonames dataset.

Note: no data is supplied by this project. If you make use of Geonames data,
you are required to provide credit. See geonames.org.

# Data Format:

The data file is expected to contain the following format:

```
The data format is tab-delimited text in utf8 encoding, with the following fields :

country code      : iso country code, 2 characters
postal code       : varchar(20)
place name        : varchar(180)
admin name1       : 1. order subdivision (state) varchar(100)
admin code1       : 1. order subdivision (state) varchar(20)
admin name2       : 2. order subdivision (county/province) varchar(100)
admin code2       : 2. order subdivision (county/province) varchar(20)
admin name3       : 3. order subdivision (community) varchar(100)
admin code3       : 3. order subdivision (community) varchar(20)
latitude          : estimated latitude (wgs84)
longitude         : estimated longitude (wgs84)
accuracy          : accuracy of lat/lng from 1=estimated to 6=centroid
```

Reference:
http://download.geonames.org/export/zip/

# Usage:

```
let geonamesPostalCodes = require('geonames-postalcodes');

// load data file from local file system,
// reference: http://download.geonames.org/export/zip/
geonamesPostalCodes.init('./CA.txt');

let entry = geonamesPostalCodes.postalCodeExactLookup('K2K');
console.log(entry);
/*
{
  countryCode: 'CA',
  postalCode: 'K2K',
  placeName: 'Kanata (Beaverbrook / South March)',
  adminName1: 'Ontario',
  adminCode1: 'ON',
  adminName2: 'Kanata',
  adminCode2: '',
  adminName3: '',
  adminCode3: '',
  latitude: '45.3704',
  longitude: '-75.9198',
  accuracy: '1'
}
*/


let entries = geonamesPostalCodes.postalCodeSearch('K2');
console.log(entries);
// [array of entries with same format as above]

entries = geonamesPostalCodes.placeNameSearch('Ottawa');
console.log(entries);
// [array of entries with same format as above]
```
