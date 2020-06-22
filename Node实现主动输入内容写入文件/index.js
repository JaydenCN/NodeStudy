const readline = require("readline");
const { readFileUtilizePromise, writeFileUtilizePromise } = require("../Node实现目录下已有的文件读取同时写入新文本/encapsulationReadWirte");
// 实例化接口对象
let inputOut = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// 提问事件的简单实现
// inputOut.question("输入要保存的路径...", (res) => {
//     path = res;
// });
// 封装
function inputOutEncapsulation(title) {
    return new Promise((resolve, reject) => {
        inputOut.question(title, (res) => {
            resolve(res);
        });
    });
}
async function inputOutAsync() {
    console.log("---写入开始---");
    let PATH = await inputOutEncapsulation("请输入要保存的路径:");
    let GODDESSNAME = await inputOutEncapsulation("你的女神是谁丫?");
    let GODDESSNAMEAGE = await inputOutEncapsulation("她多大了丫?");
    let GODDESSNAMEBIRTHDAY = await inputOutEncapsulation("记得她的生日吗?");
    let GODOFMANNAME = await inputOutEncapsulation("你的男神是谁丫?");
    let GODOFMANAGE = await inputOutEncapsulation("他多大了丫?");
    let GODOFMANBIRTHDAY = await inputOutEncapsulation("记得他的生日吗?");
    await writeFileUtilizePromise(
        PATH,
        `\n{"Name":"${GODDESSNAME}","Sex":"女","Age":"${GODDESSNAMEAGE}","Birthday":"${GODDESSNAMEBIRTHDAY}"}\n{"Name":"${GODOFMANNAME}","Sex":"男","Age":"${GODOFMANAGE}","Birthday":"${GODOFMANBIRTHDAY}"}`
    );
    inputOut.close();
}
inputOutAsync();
// 主动结束程序
inputOut.on("close", () => {
    console.log("---程序已执行结束---");
    process.exit(0);
});
