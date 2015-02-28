var fileName = 'netgear.json';

var obj = JSON.parse(require('fs').readFileSync(fileName, {flag:'r'}));
var count = 0;
for(var k in obj){
    console.log(k, obj[k].count);
    count += obj[k].count;
}
console.log(count);