const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { readFileUtilizePromise, writeFileUtilizePromise, mkdirFile } = require("./encapsulationReadWirte");
//获取HTML文档内容，内容跟Jquery一样
let httpUrl = "https://www.doutula.com/article/list/?page=1";
// 获取页面总页数
async function getNum() {
    let res = await axios.get(httpUrl);
    let $ = cheerio.load(res.data);
    let num = $(".pagination li")
        .eq($(".pagination li").length - 2)
        .text();
    return num;
}
// 获取所有图片
async function getAllPage() {
    let count = await getNum();
    //爬取所有页面
    for (let i = 0; i < count; i++) {
        await axios.get(`https://www.doutula.com/article/list/?page=${i}`).then((res) => {
            // cheerio解析HTML文档
            let $ = cheerio.load(res.data);
            $("#home .col-sm-9>a").each((index, item) => {
                // 获取分类 及 Url
                let imgUrl = $(item).attr("href");
                let reg = /(.*?)\d/gis;
                let imgTitle = reg.exec($(item).find(".random_title").text())[1];
                console.log(imgTitle);
                parsePage(imgUrl, imgTitle);
                mkdirFile(`./img/${imgTitle}`);
            });
        });
    }
}

async function parsePage(urlPath, imgTitle) {
    let data = await axioxUtil(urlPath);
    let $ = cheerio.load(data.data);
    console.log("---进入---");
    $(".pic-content img").each((i, item) => {
        console.log("---循环---");
        let imgUrl = $(item).attr("src");
        console.log("图片地址：" + imgUrl);
        let imgSuffix = path.extname(imgUrl);
        let ws = fs.createWriteStream(`./img/${imgTitle}/${imgTitle}-${i}${imgSuffix}`);
        console.log("图片后缀：" + imgSuffix);
        axios(imgUrl, { responseType: "stream" }).then((res) => {
            res.data.pipe(ws);
            res.data.on("close", () => {
                ws.close(() => {
                    console.log("写入完成，流已关闭...");
                });
            });
        });
    });
}
function axioxUtil(urlPath) {
    return new Promise((resolve, reject) => {
        axios
            .get(urlPath)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

getAllPage();
