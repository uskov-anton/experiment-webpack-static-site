var second = require("../../../src/pages/second/second.pug");

setTimeout(function() {
    var html = second();

    console.log(html);
}, 1000);
