// 实现文件的读取
const fs = require("fs");
// 简单的使用 （异步）
fs.readFile("./GODDESS.txt", { encoding: "utf-8", flag: "r" }, function (err, data) {
    if (err) {
        console.log("读取异常");
    } else {
        console.log("读取的内容：\n" + data);
    }
});
// 利用promise封装使用  结合ansyc使异步方法同步化，处理简单避免回调地狱
function readFileUtilizePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: "utf-8", flag: "r" }, function (err, data) {
            if (err) {
                console.log("读取异常");
                reject(err);
            } else {
                console.log("读取的内容：\n" + data);
                resolve(data);
            }
        });
    });
}
readFileUtilizePromise("./GODDESS.txt");
