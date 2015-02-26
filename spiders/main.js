var spider = require('./spider');
var pageURL = 'http://item.jd.com/1184730.html';

spider.crawlPage(pageURL, function(err, res){
    if(err)
        console.log('caught error:\n', err);
    else
        console.log(res);
});