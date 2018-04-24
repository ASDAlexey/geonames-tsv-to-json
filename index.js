// http://download.geonames.org/export/zip/
// curl http://download.geonames.org/export/dump/DE.zip -o ./dumps/DE.zip
const tsv = require("node-tsv-json");
const _ = require("lodash");
const fs = require("fs");
tsv({
  input: "./dumps/DE.tsv",
  parseRows: true,
}, function (err, result) {
  if (err) console.error(err);

  const keys = [
    'countryCode',
    'postalCode',
    'name',
    'admin name1',
    'admin code1',
    'admin name2',
    'admin code2',
    'admin name3',
    'admin code3',
    'latitude',
    'longitude',
    'accuracy',
  ];
  const data = result.map((item) => {
    const obj = {};
    item.forEach((el, index) => (obj[keys[index]] = el));
    return obj;
  });

  fs.writeFile("./json-dumps/DE.json", JSON.stringify(data), function (err) {
    if (err) return console.log(err);
  });
});
