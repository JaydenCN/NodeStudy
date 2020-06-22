const fs = require("fs");
//创建写入流
// (文件路径、【可选的配置操作】)
let wsObj = fs.createWriteStream("GODDESS.txt", { encoding: "utf-8", flags: "w" });
console.log(wsObj);
// 监听事件
// 打开
wsObj.on("open", function () {
    console.log("文件写入打开");
});
// 准备
wsObj.on("ready", () => {
    console.log("文件写入准备");
});
// 关闭
wsObj.on("close", () => {
    console.log("流关闭");
});

wsObj.write("我爱你，无畏人海的勇气", (err) => {
    if (!err) {
        console.log("内容流入完成");
    } else {
        console.log("文件写入异常");
    }
});
wsObj.write("我爱你，无畏人海的勇气2", (err) => {
    if (!err) {
        console.log("内容流入完成");
    } else {
        console.log("文件写入异常");
    }
});
wsObj.end(() => {
    console.log("文件写入完成");
});
