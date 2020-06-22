const { readFileUtilizePromise, writeFileUtilizePromise, mkdirFile } = require("./encapsulationReadWirte");
const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios").create({ responseType: "arraybuffer" });
const url = require("url");
const { last } = require("lodash");
let httpRequest = "http://www.netbian.com";
let count = 1;
async function main() {
    let rquest = await axios.get(httpRequest);
    let $ = cheerio.load(rquest.data);
    $(".menu .more .cate a").each(async (i, item) => {
        //注意 ：这里的each要用async，不然作用域下的await不可用
        let strW = $(item).attr("href"); //分类的Url
        if (strW != "http://pic.netbian.com/") {
            let classTitle = strW.split("/")[strW.split("/").length - 2]; //分类标题
            mkdirFile(`./img/${classTitle}`);
            let num = await showPage(url.resolve(httpRequest, strW), classTitle);
            for (let i = 1; i <= num; i++) {
                if (i == 1) {
                    console.log(`第${count}此进入循环......   爬取目标：${httpRequest}${strW}index.htm`);
                    await sleep(10000);
                    //await getClassPage(url.resolve(httpRequest, strW, `/index.htm`), classTitle);
                    count++;
                } else {
                    console.log(`第${count}此进入循环......   爬取目标：${httpRequest}${strW}index_${i}.htm`);
                    await sleep(10000);
                    //await getClassPage(url.resolve(httpRequest, strW, `/index_${i}.htm`), classTitle);
                    count++;
                }
            }
        }
    });
}

/**
 * @description  获取每个分类的页数
 * @author Jayden
 * @date 2020-06-20
 */
async function showPage(path, classTitle) {
    let res = await axios.get(path);
    let $ = cheerio.load(res.data);

    let lastPage = $(".page a")
        .eq($(".page a").length - 2)
        .attr("href");
    let reg = /\/.*?\/index_(.*?).htm/;
    let pageNum = reg.exec(lastPage)[1];
    return pageNum;
}
/**
 * @description 获取每页的所有图片
 * @author Jayden
 * @date 2020-06-20
 * @param {*} path
 * @param {*} classTitle
 */
async function getClassPage(path, classTitle) {
    let data = await axios.get(path);
    let $ = cheerio.load(data.data);
    $(".list li a").each(async (i, item) => {
        // 某一页的所有图片链接
        if ($(item).attr("href") != "http://pic.netbian.com/") {
            await details(url.resolve(httpRequest, $(item).attr("href")), classTitle);
        }
    });
}
/**
 * @description 详情页的图片抓取
 * @author Jayden
 * @date 2020-06-20
 * @param {*} path
 * @param {*} classTitle
 */
async function details(path, classTitle) {
    let data = await axios.get(path);
    let $ = cheerio.load(data.data);
    $(".pic img").each((i, item) => {
        //图片详情抓取
        let imgName = $(item).attr("src").split("/")[$(item).attr("src").split("/").length - 1];
        let createWStream = fs.createWriteStream(`./img/${classTitle}/${imgName}`);
        axios.get($(item).attr("src"), { responseType: "stream" }).then((res) => {
            res.data.pipe(createWStream);
            createWStream.on("close", () => {
                createWStream.close(() => {
                    console.log("此次写入完成，流关闭...");
                });
            });
        });
    });
}
/**
 * @description 延迟器
 * @author Jayden
 * @date 2020-06-20
 */

function sleep(milliseconds = 1000) {
    // 封装sleep函数，返回一个Promise，在异步使用时前面加个await
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("等待爬取中......");
            resolve();
        }, milliseconds);
    });
}
// 启动入口
main();
