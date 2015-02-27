var async = require('async');
var util = require('util');
var fs = require('fs');
var spider = require('./spider');
var cli = require('cli_debug');
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

                console.log(new Date(), '< ==== >', res.start);

                fs.writeFileSync(fileName,  JSON.stringify(res));
            }
            res = undefined;
            cb();
        });
    };
}

async.series([
        //task('http://item.jd.com/1211151.html', 'TOTOLINK.json')
        task('190142', 'net-gear.new.json'),
        task('1238332', 'tp-link.new.json')
    ],
    function(){
    }
);

cli.debug();

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