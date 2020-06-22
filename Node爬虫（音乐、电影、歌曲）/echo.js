const fs = require("fs");
const axios = require("axios");
const { https } = require("follow-redirects");
const path = require("path");
async function getPage(num) {
    let httpUrl = `http://www.app-echo.com/api/recommend/sound-day?page=${num}`;
    let request = await axios.get(httpUrl);
    request.data.list.forEach((item) => {
        let musicTitme = item.sound.name;
        let musicUrl = item.sound.source;
        let musicId = path.parse(musicUrl).name;
        let config = `{"name": "${musicTitme}", "url": "${musicUrl}", "id": "${musicId}"}\n`;
        fs.writeFile("./mp3/musicConfig.txt", config, { encoding: "utf-8", flag: "a" }, () => {
            console.log(`${musicTitme}config追加完毕...\n`);
        });
        console.log(musicTitme + ":" + musicUrl + ":" + musicId);
        // download(musicUrl, musicId, musicTitme);
    });
}
async function download(url, musicId, musicTitme) {
    let res = await axios.get(url, { responseType: "stream" });
    let ws = fs.createWriteStream(`./mp3/${musicId}.mp3`);
    res.data.pipe(ws);
    res.data.on("close", () => {
        ws.close(() => {
            console.log(`${musicTitme}歌曲写入完毕，流关闭...\n`);
        });
    });
}
getPage(1);
