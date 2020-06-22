const fs = require("fs");
/**
 * @description 文件读取
 * @author Jayden
 * @date 2020-06-17
 * @param {*} filePath 文件路径
 * @returns promise
 */
function readFileUtilizePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: "utf-8", flag: "r" }, function (err, data) {
            if (err) {
                console.log("读取异常");
                reject(err);
            } else {
                console.log("读取成功");
                resolve(data);
            }
        });
    });
}
/**
 * @description 文件写入
 * @author Jayden
 * @date 2020-06-17
 * @param {*} filePath 文件路径
 * @param {*} content 写入内容
 * @returns promise
 */
function writeFileUtilizePromise(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, { encoding: "utf-8", flag: "a" }, (err) => {
            if (!err) {
                resolve();
                console.log("写入成功！");
            } else {
                reject(err);
                console.log("写入失败！");
            }
        });
    });
}
/**
 * @description 创建目录
 * @author Jayden
 * @date 2020-06-18
 * @returns Promise
 */
function mkdirFile(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (!err) {
                resolve();
            } else {
                console.log("创建失败！");
            }
        });
    });
}

module.exports = { readFileUtilizePromise, writeFileUtilizePromise, mkdirFile };
