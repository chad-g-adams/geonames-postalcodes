# geonames-postalcodes

In-memory postal code lookup and search function based on Geonames dataset.

Note: no data is supplied by this project. If you make use of Geonames data,
you are required to provide credit. See geonames.org.

Usage:

```
// load the data file from local file system,
// reference: http://download.geonames.org/export/zip/
geonamesPostalCodes.init('./CA.txt');

entry = geonamesPostalCodes.postalCodeExactLookup('K2K');
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


entries = geonamesPostalCodes.postalCodeSearch('K2');
console.log(entries);
// [array of entries with same format as above]

entries = geonamesPostalCodes.placeNameSearch('Ottawa');
console.log(entries);
// [array of entries with same format as above]
```
