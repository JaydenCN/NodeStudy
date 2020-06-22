let axios = require("axios");
let classUrl = "https://www.1905.com/vod/list/n_1_t_5/o3p1.html";
let fs = require("fs");
let { readFileUtilizePromise, writeFileUtilizePromise, mkdirFile } = require("./encapsulationReadWirte");

function requestUrl(urlPath) {
    return new Promise((resolve, reject) => {
        axios
            .get(urlPath, { responseEncoding: "utf8" })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
let arrClassMove = [];
async function getUrlRespose() {
    let data = await requestUrl(classUrl);
    let reg = /<span class="search-index-L">类型(.*?)<div class="grid-12x">/gis;
    // exec匹配结果返回一个数组，[0]是原文，[1]是结果
    let result = reg.exec(data.data)[1];
    console.log(result);
    // . : () 要转义
    let reg1 = /<a href="javascript\:void\(0\);" onclick="location\.href='(.*?)';return false;" >(.*?)<\/a>/gis;
    //let reg1 = /<a href="(.*?)" .*?>(.*?)<\/a>/gis;
    while ((res = reg1.exec(result))) {
        // 全部不需要 戏剧有个BUG
        if (res[2] != "全部" && res[2] != "喜剧") {
            let classMove = {
                Name: res[2],
                Url: res[1],
            };
            getMovies(classMove.Url, classMove.Name);
            arrClassMove.push(classMove);
            await mkdirFile("../Axios/movies/" + res[2]);
        }
    }
    console.log(arrClassMove);
}
getUrlRespose();
async function getMovies(url, moveClassName) {
    let request = await requestUrl(url);
    let data = request.data;
    let reg = /<a class="pic-pack-outer" target="_blank" href="(.*?)" title="(.*?)">/gis;
    var arrList = [];
    while ((res = reg.exec(data))) {
        let className = {
            name: res[2],
            Url: res[1],
        };
        await parsePage(res[1], moveClassName);
        await arrList.push(className);
    }
    console.log("爬取   【" + `${moveClassName}` + "】   类的结果如下：\n");
    await console.log(arrList);
}
async function parsePage(url, moveClassName) {
    let request = await requestUrl(url);
    let data = request.data;
    let reg = /<h1 class="playerBox-info-name playerBox-info-cnName">(.*?)<\/h1>.*?id="playerBoxIntroCon">(.*?)<a.*?导演.*?target="_blank" title="(.*?)" data-hrefexp/gis;
    let response = reg.exec(data);
    let moveUrl = url;
    let moveJson = {
        电影类型: moveClassName,
        电影名称: response[1],
        电影简介: response[2],
        导演: response[3],
        观看地址: moveUrl,
    };
    await writeFileUtilizePromise("../Axios/movies/" + moveClassName + "/" + moveJson.电影名称 + ".json", JSON.stringify(moveJson));
    console.log(moveJson);
}
