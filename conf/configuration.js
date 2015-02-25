var path = require('path');
var _sys_conf = (function () {
    function _sys_conf() {
        this.BASE_PATH = path.join(__dirname, "../");
        this.DATA_DIR =  path.join(this.BASE_PATH, "data");
    }
    return _sys_conf;
})();
var CONF = new _sys_conf();
global.CONF = CONF;
