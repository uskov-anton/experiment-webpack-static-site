var main = require("../../src/pages/main.pug");

setTimeout(function() {
    var html = main();

    console.log(html);
}, 1000);