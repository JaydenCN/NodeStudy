const fs = require("fs");

// 创捷读取流
let rsObj = fs.createReadStream("./多余的解释.mp3", { flags: "r" });
let wsObj = fs.createWriteStream("范浩杰.mp3", { flags: "w" });
rsObj.on("open", () => {
    console.log("打开读取文件...");
});
// 每一批数据流入完成，分多次读取
let num = 1;
rsObj.on("data", (over) => {
    console.log(`第${num}批`);
    console.log("本次读取字节大小：" + over.length);
    console.log(over);
    wsObj.write(over);
    num++;
});

rsObj.on("close", () => {
    wsObj.end(() => {
        console.log("写入流关闭");
    });
    console.log("读取流关闭...");
});
