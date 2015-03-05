//  
//                                  _oo8oo_
//                                 o8888888o
//                                 88" . "88
//                                 (| -_- |)
//                                 0\  =  /0
//                               ___/'==='\___
//                             .' \\|     |// '.
//                            / \\|||  :  |||// \
//                           / _||||| -:- |||||_ \
//                          |   | \\\  -  /// |   |
//                          | \_|  ''\---/''  |_/ |
//                          \  .-\__  '-'  __/-.  /
//                        ___'. .'  /--.--\  '. .'___
//                     ."" '<  '.___\_<|>_/___.'  >' "".
//                    | | :  `- \`.:`\ _ /`:.`/ -`  : | |
//                    \  \ `-.   \_ __\ /__ _/   .-` /  /
//                =====`-.____`.___ \_____/ ___.`____.-`=====
//                                  `=---=`
//  
//  
//               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 
//                          佛祖保佑         永无bug
//                          
var co = require('co');
var fs = require('fs');
var util = require('util');
var moment = require('moment');
var cheerio = require('cheerio');
var _s = require('underscore.string');
var crawler = require('./crawler'),
    crawl = crawler.crawl,
    crawlWithOpts = crawler.crawlWithOpts,
    sleep = crawler.sleep;

function getURL(url) {
    return crawl('get', url);
}

function crawlPage(url, start, end, parse) {
    return function (fn) {
        crawl('get', url)(parse(start, end, fn));
    };
}

function getPageUrl(id, current) {
    var url = util.format('http://club.jd.com/review/%d-1-%d.html', id, current);
    console.log('URL:', url);
    return url;
}

function parse(start, end, fn) {
    return function (err, res, html) {
        var $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        $('div.mc div.item').each(function () {
            var columns = $(this).find('div.dl-extra dd');
            var date = moment(_s.trim($(columns[1]).text())).toDate();
            if (date >= start && date <= end) {
                var k = _s.trim($(columns[0]).text());
                if (!_s.trim(k)) {
                    k = 'default';
                }
                var star = $(this).find('div.o-topic span.star').attr('class').substr(-1) + '星';
                meta[k] = meta[k] || {};
                meta[k]['count'] = meta[k].hasOwnProperty('count') ? meta[k]['count'] + 1 : 1;
                meta[k][star] = meta[k].hasOwnProperty(star) ? meta[k][star] + 1 : 1;
                //console.log(util.inspect(meta));
            }
        });

        fn(err, html.length);
    };
}

//Uncaught Exception
process.on('uncaughtException', function (err) {
    logger.error(err);
});
var domain = require('domain').create();
domain.on('error', function (err) {
    logger.error(err);
});

var productId = 190142;         //netgear
var fileName = 'netgear.json';      //file
var maxPageNo = 1866;               // max page
var sleepSeconds = 10;
var start = moment("2015-02-05").toDate();
var end = moment("2015-03-05").toDate();
var meta = {};

domain.run(function () {
    co(function*() {
        //奇数
        for (var pageNo = 1; pageNo <= maxPageNo; pageNo += 2) {
            var url = getPageUrl(productId, pageNo);
            console.log('第', pageNo, '页', moment().format('YYYY-MM-D hh:mm:ss a'));
            var size = yield crawlPage(url, start, end, parse);
            console.log('page size:', size, 'bytes');
            console.log(util.inspect(meta));
            console.log('-----------------<<<<<');
            sleep(sleepSeconds);
        }

        //偶数
        for (var pageNo = 2; pageNo <= maxPageNo; pageNo += 2) {
            var url = getPageUrl(productId, pageNo);
            console.log('第', pageNo, '页', moment().format('YYYY-MM-D hh:mm:ss a'));
            var size = yield crawlPage(url, start, end, parse);
            console.log('page size:', size, 'bytes');
            console.log(util.inspect(meta));
            console.log('-----------------<<<<<');
            sleep(sleepSeconds);
        }

        console.log('END ----------------->>>>');
        fs.writeFileSync(fileName, JSON.stringify(meta));
    });
});

//asynchronously version.
//var url = getPageUrl(190142, 1);
//console.log(url);
//getURL(url)(function(err, content){
//    console.log(content);
//});
