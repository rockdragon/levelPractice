var cheerio = require('cheerio');
var util = require('util');
var _s = require('underscore.string');

var By = require('selenium-webdriver').By,
    //until = require('selenium-webdriver').until,
//browser = require('selenium-webdriver/firefox');
    browser = require('selenium-webdriver/chrome');
var driver = new browser.Driver();

var meta = {};
var callback = null;
var current = 1;
var rootURL = null;

function getPageUrl(){
    var url = util.format('%s-%d-0.html', rootURL, current);
    console.log('URL:', url);
    return url;
}

function crawlPage(pageURL, cb) {
    meta = {};
    callback = cb;
    rootURL = pageURL;
    driver.get(getPageUrl()).then(function() {
        driver.sleep(2000).then(function() {
            extractComments();
        })
    });
    //driver.findElement(By.id('detail-tab-comm')).click().then(function () {
    //    driver.sleep(3000).then(function () {
    //        extractComments();
    //    });
    //});
}

function fetchNextPager(){
    driver.get(getPageUrl()).then(function() {
        driver.sleep(2000).then(function () {
            extractComments();;
        });
    })
    .then(null, function (err) {
        console.log('error message:', err.message);
        if(_s.contains(err.message, 'stale') || _s.contains(err.message, 'clickable')){//STALE_ELEMENT_REFERENCE
            console.log('motherfucker stale is coming, try to fetch element again.');
            driver.sleep(2000).then(function () {
                fetchNextPager();  //recursive calling
            });
        } else {
            console.log(err.stack);
            callback(null, meta);
        }
    });
}

function extractComments() {
    driver.findElement(By.id('comments-list')).getInnerHtml().then(function (innerHTML) {
        driver.findElement(By.className('current')).getInnerHtml().then(function(currentPage){
            console.log(util.format('\n当前页:%s ----------------->>>>', currentPage));

            var $ = cheerio.load(innerHTML, {
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
                console.log(util.inspect(meta));
            });
            current = parseInt(currentPage, 10) + 1;
            fetchNextPager();
        });
    })
    .then(null, function (err) {
            console.log('error message:', err.message);
            if(_s.contains(err.message, 'stale') || _s.contains(err.message, 'clickable')){//STALE_ELEMENT_REFERENCE
                driver.sleep(2000).then(function () {
                    console.log('motherfucker stale is coming, try to fetch element again.');
                    extractComments();  //recursive calling
                });
            } else {
                console.log(err.stack);
                callback(null, meta);
            }
    });
}

module.exports.crawlPage = crawlPage;


