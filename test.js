var loaderUtils = require("loader-utils");

var query = loaderUtils.parseQuery("?sourceMap&modules&importLoaders=2&localIdentName=[name]-[local]");

console.log(query);
