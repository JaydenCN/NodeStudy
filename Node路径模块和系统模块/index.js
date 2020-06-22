let path = require("path");
let write = require("fs");
let strPath = "http://jayden.store";
let info = path.extname(strPath); // 获取文件后缀
console.log(info);
let pathDir = ["GODDESS", "HA", "ENEN"];
let infoDir = path.resolve(...pathDir); // 拼接成路径
console.log(infoDir);
console.log(__dirname); // 得到当前文件目录
let infoJoin = path.join(__dirname, "dir", "阿杰");
console.log(infoJoin); // 拼接成路径
let strW = "http://127.0.0.1:5500/Node路径模块和系统模块/index.html";
let arrS = strW.split("/"); //拆分
console.log(arrS);
let strB = arrS.splice(arrS.length - 1, arrS.length); // 截取
console.log(strB);
let dirStr = path.join(__dirname, ...strB); //合并

// write.readFile(dirStr, { encoding: "utf-8", flag: "r" }, (err, data) => {
//     if (!err) {
//         console.log(data);
//     }
//     console.log(err);
// });

console.log("当前执行目录：" + __dirname);
console.log("当前执行文件：" + __filename);
console.log("当前执行文件的后缀：" + path.extname(__filename));
console.log(path.parse(__filename));
let os = require("os");
console.log(os.cpus());
console.log("内存信息：" + os.totalmem());
console.log("操作" + os.arch());
console.log("剩余内存" + os.freemem());
console.log("系统" + os.platform());
console.log("系统运行时间：" + os.uptime());
var date = new Date();
console.log(date.toLocaleString());
var hour = date.getHours();
console.log(hour);
