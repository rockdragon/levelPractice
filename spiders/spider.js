var cheerio = require('cheerio');
var util = require('util');
var _s = require('underscore.string');

var By = require('selenium-webdriver').By,
    //until = require('selenium-webdriver').until,
//browser = require('selenium-webdriver/firefox');
    browser = require('selenium-webdriver/chrome');
var driver = new browser.Driver();

var meta = {};

function crawlPage(pageURL, cb) {
    meta = {};
    driver.get(pageURL);
    driver.findElement(By.id('detail-tab-comm')).click().then(function () {
        driver.sleep(3000).then(function () {
            extractComments(cb);
        });
    });
}

function extractComments(cb) {
    driver.findElement(By.className('com-table-main')).getInnerHtml().then(function (innerHTML) {
        driver.findElement(By.className('ui-page-curr')).getInnerHtml().then(function(currentPage){
            console.log(util.format('\n当前页:%s ----------------->>>>', currentPage));

            var $ = cheerio.load(innerHTML, {
                normalizeWhitespace: true,
                xmlMode: true
            });
            $('table.com-item-main').each(function () {
                var columns = $(this).find('td.com-i-column');
                var k = $(columns[2]).children().first().children().last().text();
                if(!_s.trim(k)){
                    k = 'default';
                }
                var star = $(columns[1]).children().first().attr('class').substr(-1) + '星';
                meta[k] = meta[k] || {};
                meta[k]['count'] = meta[k].hasOwnProperty('count') ? meta[k]['count'] + 1 : 1;
                meta[k][star] = meta[k].hasOwnProperty(star) ? meta[k][star] + 1 : 1;
                //console.log(util.inspect(meta));
            });

            var next = driver.findElement(By.className('ui-pager-next'));
            next.click().then(function () {
                driver.sleep(2000).then(function () {
                    extractComments(cb);
                });
            }).then(null, function (err) {
                console.log(err.stack);
                cb(null, meta);
            });

                //if (next) {
                //    next.click().then(function () {
                //        driver.sleep(2000).then(function () {
                //            extractComments(cb);
                //        });
                //    });
                //} else {
                //    return cb(null, meta);
                //}

        });
    })
    .then(null, function (err) {
        console.log(err.stack);
        cb(null, meta);
    });
}

module.exports.crawlPage = crawlPage;


