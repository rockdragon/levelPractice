var async = require('async');
var util = require('util');
var fs = require('fs');
var spider = require('./spider');
//var pageURL = 'http://item.jd.com/1184730.html';

function task(url, fileName){
    return function(cb){
        spider.crawlPage(url, function(err, res){
            if(err) {
                console.log('caught error:\n', err);
            }
            else {
                console.log('END ----------------->>>>');
                console.log(util.inspect(res));

                fs.writeFileSync(fileName,  JSON.stringify(res));
            }
            cb();
        });
    };
}

async.series([
        //task('http://item.jd.com/1105402.html', 'hi-wifi.json'),
        task('http://item.jd.com/933212.html', 'net-gear.json'),
        task('http://item.jd.com/1238332.html', 'tp-link.json')
    ],
    function(){
    }
);

//spider.crawlPage(pageURL, function(err, res){
//    if(err)
//        console.log('caught error:\n', err);
//    else {
//        console.log('END ----------------->>>>');
//        console.log(util.inspect(res));
//
//        fs.writeFileSync('result.json', res);
//
//    }
//});