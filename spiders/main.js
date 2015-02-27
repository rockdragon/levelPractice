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
            res = undefined;
            cb();
        });
    };
}

async.series([
        //task('http://item.jd.com/1211151.html', 'TOTOLINK.json')
        task('http://club.jd.com/review/190142-1', 'net-gear.new.json'),
        task('http://club.jd.com/review/1238332-1', 'tp-link.new.json')
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