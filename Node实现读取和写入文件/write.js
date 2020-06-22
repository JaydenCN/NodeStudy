const fs = require("fs");

//写入的简单应用，（异步） flag:a 追加 | w 重写
fs.writeFile("./GODOFMAN.txt", '{"Name":"周星驰","Sex":"男","Age":"58","Birthday":"1962-6-22",}', { encoding: "utf-8", flag: "w" }, (err) => {
    if (!err) {
        console.log("写入成功！");
    } else {
        console.log("写入失败！");
    }
});
// 封装
function writeFileUtilizePromise(filePath, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, { encoding: "utf-8", flag: "w" }, (err) => {
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
writeFileUtilizePromise("./GODOFMAN.txt", '{"Name":"周星驰","Sex":"男","Age":"58","Birthday":"1962-6-22",}');
