const fs = require("fs");
const { readFileUtilizePromise, writeFileUtilizePromise } = require("./encapsulationReadWirte");
const { equal } = require("assert");
fs.readdir("../Node实现读取和写入文件", (err, files) => {
    if (!err) {
        console.log(files);
        files.forEach(async (file) => {
            if (file.endsWith(".txt")) {
                let readResult = await readFileUtilizePromise("../Node实现读取和写入文件/" + file);
                await writeFileUtilizePromise("GODDESS_GODOFMAN.txt", file + "的文件内容如下：\n" + readResult + "\n");
            }
        });
    } else {
        console.log("读取失败");
    }
});
