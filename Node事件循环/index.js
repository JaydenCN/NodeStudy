const fs = require("fs");

fs.readFile("./data.txt", { encoding: "utf-8", flag: "r" }, (err, data) => {
    if (!err) {
        console.log(JSON.parse(data));
        //成功事件
        JaydenEvent.emit("fileSuccess", data);
    } else {
        console.log("出错了");
    }
});

// 设计者模式

let JaydenEvent = {
    event: {
        //fileSuccess: [fn, fn, fn],
    },
    on: function (eventName, eventFn) {
        if (this.event[eventName]) {
            this.event[eventName].push(eventFn);
        } else {
            this.event[eventName] = [];
            this.event[eventName].push(eventFn);
        }
    },
    emit: function (eventName, eventMsg) {
        if (this.event[eventName]) {
            this.event[eventName].forEach((element) => {
                element(eventMsg);
            });
        }
    },
};
JaydenEvent.on("fileSuccess", (eventMsg) => {
    console.log("去数据库查看用户姓名");
});
JaydenEvent.on("fileSuccess", (eventMsg) => {
    console.log("去数据库查看用户年龄");
});
JaydenEvent.on("fileSuccess", (eventMsg) => {
    console.log("去数据库查看用户生日");
});
