var moment = require('moment');

var d1 = moment('2014-11-11');
var d2 = moment('2015-02-19');

console.log(d1.toDate(), d2.toDate(), d1.toDate() < d2.toDate());