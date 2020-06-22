const fs = require("fs");

// 创捷读取流
let rsObj = fs.createReadStream("./多余的解释.mp3", { flags: "r" });
let wsObj = fs.createWriteStream("多余的解释盗版.mp3", { flags: "w" });
rsObj.on("open", () => {
    console.log("打开读取文件...");
});
// 每一批数据流入完成，分多次读取
rsObj.on("close", () => {
    wsObj.end(() => {
        console.log("写入流关闭");
    });
    console.log("读取流关闭...");
});
// 通过封装好的管道直接将读取流写入，更简单快捷，不需要多余的操作
rsObj.pipe(wsObj);
