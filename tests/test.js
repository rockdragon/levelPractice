require("../conf/configuration.js");

var levelQuery = require('level-queryengine'),
    jsonqueryEngine = require('jsonquery-engine'),
    levelup = require('level'),
    subkey = require('level-subkey');

var rawDb = levelup(global.CONF.DATA_DIR, { valueEncoding: "json" });
var db = levelQuery(rawDb);
db.query.use(jsonqueryEngine());

db.open(function(err, conn){
    if (err) {
        console.log(err);
    }
    db.put('name', 'hello', function(err){
        if(err){
            console.log(err);
        }
        db.get('name', function(err, val){
            console.log('name', val);
        });
    });
});

