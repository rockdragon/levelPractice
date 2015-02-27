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

function getURL(url){
    return crawl('get', url);
}

function crawlPage(url, parse) {
    return function (fn) {
        crawl('get', url)(parse(fn));
    };
}

function getPageUrl(id, current){
    var url = util.format('http://club.jd.com/review/%d-1-%d-0.html', id, current);
    console.log('URL:', url);
    return url;
}

function parse(fn) {
    return function (err, res, html) {
        var $ = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        $('div.mc div.item').each(function () {
            var columns = $(this).find('div.dl-extra dd');
            var k = _s.trim($(columns[0]).text());
            if(!_s.trim(k)){
                k = 'default';
            }
            var star = $(this).find('div.o-topic span.star').attr('class').substr(-1) + '星';
            meta[k] = meta[k] || {};
            meta[k]['count'] = meta[k].hasOwnProperty('count') ? meta[k]['count'] + 1 : 1;
            meta[k][star] = meta[k].hasOwnProperty(star) ? meta[k][star] + 1 : 1;
            //console.log(util.inspect(meta));
        });

        fn(err, meta);
    };
}

var productId = 190142;         //netgear
var fileName = 'netgear.json';      //file
var meta = {};

co(function*(){
    for(var pageNo = 1; pageNo <= 1866; pageNo ++) {
        var url = getPageUrl(productId, pageNo);
        console.log('第', pageNo, '页', moment().format('YYYY-MM-D hh:mm:ss a'));
        yield crawlPage(url, parse);
        console.log(util.inspect(meta));
        console.log('-----------------<<<<<');
        sleep(3);
    }

    console.log('END ----------------->>>>');
    fs.writeFileSync(fileName,  JSON.stringify(meta));
});

//asynchronously version.
//var url = getPageUrl(190142, 1);
//console.log(url);
//getURL(url)(function(err, content){
//    console.log(content);
//});
