let nodeUrl = require("url");

let httpUrl1 = "https://sale.vmall.com/618.html?cid=10618";
let httpUrl2 = "https://www.vmall.com/product/10086397382774.html#10086921113283";
console.log(nodeUrl.parse(httpUrl1));
console.log(nodeUrl.parse(httpUrl2));
let query = "../mode.html&bid=2516";
//合并地址 去除多余 ./ ../
console.log(nodeUrl.resolve(httpUrl1, query));
