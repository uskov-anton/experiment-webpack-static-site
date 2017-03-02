var main = require("../../src/pages/main.pug");
var second = require("../../src/pages/second/second.pug");

module.exports = function render(locals) {
    return {
        "/main.html": main(),
        "/second/second.html": second()
    };
};
