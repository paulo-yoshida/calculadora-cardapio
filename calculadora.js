// Import dependencies
const fs = require("fs");
const csv = require('csvtojson');

(async () => {
    // load csv
  const tbalimentos = await csv().fromFile("alimentos.csv");
  
  //
  console.log(tbalimentos);
})();

