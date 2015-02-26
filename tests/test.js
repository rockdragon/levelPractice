require("../conf/configuration.js");

var levelQuery = require('level-queryengine'),
    jsonqueryEngine = require('jsonquery-engine'),
    levelup = require('level'),
    subkey = require('level-subkey');

var rawDb = levelup(global.CONF.DATA_DIR, { valueEncoding: "json" });
var db = levelQuery(rawDb);
db.query.use(jsonqueryEngine());

//db.open(function(err, conn){
//    if (err) {
//        console.log(err);
//    }
//    db.put('name', 'hello', function(err){
//        if(err){
//            console.log(err);
//        }
//        db.get('name', function(err, val){
//            console.log('name', val);
//        });
//    });
//});

function mktime() {
    var a = new Date,
        b = arguments,
        c = 0,
        d = ["Hours", "Minutes", "Seconds", "Month", "Date", "FullYear"];
    for (c = 0; c < d.length; c++) if ("undefined" == typeof b[c]) b[c] = a["get" + d[c]](),
        b[c] += 3 === c;
    else if (b[c] = parseInt(b[c], 10), isNaN(b[c])) return ! 1;
    return b[5] += b[5] >= 0 ? b[5] <= 69 ? 2e3: b[5] <= 100 ? 1900 : 0 : 0,
        a.setFullYear(b[5], b[3] - 1, b[4]),
        a.setHours(b[0], b[1], b[2]),
    (a.getTime() / 1e3 >> 0) - (a.getTime() < 0)
}
//function monthDay(a, b) {
//    var l, m, n, d = new Date(1e3 * a),
//        e = new Date(1e3 * b),
//        f = d.getFullYear(),
//        g = d.getMonth() + 1,
//        h = d.getDate(),
//        i = e.getFullYear(),
//        j = e.getMonth() + 1,
//        k = e.getDate(),
//        o = "",
//        p = 12 * (i - f) + j - g;
//    return l = Math.floor(p / 12),
//        m = p % 12,
//        m = m - Math.floor(m) === 0 ? m + 1 : m,
//        n = (mktime(0, 0, 0, j, k, i) - mktime(0, 0, 0, j, h, i)) / 86400,
//    0 > n && (m -= 1),
//    0 > m && (l -= 1),
//    l > 0 && (o += l + "\u5e74"),
//    m > 0 && (o += m + "\u4e2a\u6708"),
//        o
//}
//
//getData: function(a, b, c) {
//    var d = this;
//    this.wrap = a,
//        this.type = b || 0,
//        this.page = c,
//    /isdebug/.test(location.href) && (console.log(this.wrap), console.log("Type:" + this.type + " Page:" + this.page)),
//        this.commRateLoaded = !1,
//        this.url = "http://club.jd.com/productpage/p-{skuId}-s-{commType}-t-{sortType}-p-{currPage}.html",
//        this.url = this.url.replace("{skuId}", this.sku).replace("{commType}", this.type).replace("{sortType}", this.cType).replace("{currPage}", this.page),
//    /debug=verderComment/.test(location.href) && (this.url = "http://club.jd.com/productpage/p-1166100754-s-2-t-3-p-0.html"),
//        $.ajax({
//            url: this.url,
//            dataType: "jsonp",
//            success: function(a) {
//                d.setData(a)
//            }
//        })
//}
//
//b.getData($("#comment-" + pageConfig.commentsList_TAB.current), a.score, d, b.cType)


var util = require('util');
console.log(util.format('http://club.jd.com/productpage/p-1184730-s-0-t-0-p-1.html?callback=jQuery%s&_=%s', Math.floor(1e7 * Math.random()),  new Date().getTime()));


//var Random = require('random-js');
//console.log(new Random(Random.engines.mt19937().seed(1335)).integer(1, 200));

console.log('12456757875W'.substr(-1));

//http://club.jd.com/productpage/p-1184730-s-0-t-0-p-1.html?callback=jQuery2912203&_=1424927202191
//http://club.jd.com/productpage/p-1184730-s-0-t-0-p-1.html?callback=jQuery8646070&_=1424927212163

