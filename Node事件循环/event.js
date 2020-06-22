// 事件模块
let events = require("events");
let readFile = require("fs");
let Jaydenevent = new events.EventEmitter();
//emit(eventsName) 主动触发对应的监听事件  ----》》 on(eventsName)监听
Jaydenevent.on("helloSuccess", (data) => {
    console.log("吃饭");
});
Jaydenevent.on("helloSuccess", (data) => {
    console.log("洗澡");
});
Jaydenevent.on("helloSuccess", (data) => {
    console.log("睡觉觉");
});
Jaydenevent.on("helloErr", (err) => {
    console.log("抛出异常");
    console.log("异常信息如下\n" + err);
});
// 基本使用
// readFile.readFile("data.txt", { flag: "r", encoding: "utf-8" }, (err, data) => {
//     if (err) {
//         console.log(err);
//         Jaydenevent.emit("helloErr", err);
//     } else {
//         console.log(data);
//         Jaydenevent.emit("helloSuccess", data);
//     }
// });
/**
 * @description  封装
 * @author Jayden
 * @date 2020-06-18
 * @param {*} path 读取路径
 * @returns promise ： 利用.then().catch()优雅的处理错误，不让程序崩掉
 */
function showPromis(path) {
    return new Promise((resolve, reject) => {
        readFile.readFile(path, { flag: "r", encoding: "utf-8" }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
        .then((resolve) => {
            return [null, resolve]; //正常读取返回
        })
        .catch((reject) => {
            return [reject, null]; //读取异常返回
        });
}

async function showAsync() {
    // 解构赋值
    let [err, data] = await showPromis("data.txt");
    if (err) {
        Jaydenevent.emit("helloErr", err);
    } else {
        console.log(JSON.parse(data)); //转json对象
        Jaydenevent.emit("helloSuccess", data);
    }
}
showAsync();
