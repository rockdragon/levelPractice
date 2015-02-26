var cheerio = require('cheerio');
var util = require('util');

var By = require('selenium-webdriver').By,
    //until = require('selenium-webdriver').until,
//browser = require('selenium-webdriver/firefox');
    browser = require('selenium-webdriver/chrome');
var driver = new browser.Driver();

var meta = {};

function crawlPage(pageURL, cb) {
    driver.get(pageURL);
    driver.findElement(By.id('detail-tab-comm')).click().then(function () {
        driver.sleep(2000).then(function () {
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
            $('table.com-item-main tr').each(function () {
                var columns = $(this).children();
                var k = $(columns[2]).children().first().children().last().text();
                var star = $(columns[1]).children().first().attr('class').substr(-1) + '星';
                meta[k] = meta.hasOwnProperty(k) ? meta[k] + 1 : 1;
                meta[k][star] = meta[k].hasOwnProperty(star) ? meta[k][star] + 1 : 1;
                console.log(util.inspect(meta));

                process.nextTick(function () {
                    var next = driver.findElement(By.className('ui-pager-next'));
                    if (next) {
                        next.click().then(function () {
                            driver.sleep(2000).then(function () {
                                extractComments(cb);
                            });
                        });
                    } else {
                        return cb(null, meta);
                    }
                });
            });
        });
    })
    .then(null, function (err) {
        cb(err, null);
    });
}

module.exports.crawlPage = crawlPage;


