let puppeteer = require("puppeteer");
//启动浏览器
(async () => {
    // puppeteer.launch([{}]); 可以传一个对象
    //{ headless: false }可以配置为(有/无)界面浏览器
    //defaultViewport: { width: 500, height: 500 } 设置宽高
    let browser = await puppeteer.launch({ headless: false });
    //打开页面
    let page = await browser.newPage();
    //页面地址
    await page.goto("https://www.dygod.net/");
    //截图
    //await page.screenshot({ path: "jayden.png" });
    //$$eval可以是回调函数在浏览器控制台中运行
    let res = await page.$$eval("#menu li a", (element) => {
        let elementList = [];
        element.forEach((item) => {
            let name = item.innerText;
            let href = item.getAttribute("href");
            let obj = {
                name: name,
                href: href,
            };
            elementList.push(obj);
        });
        console.log(elementList);
        //过滤没有用的链接
        return elementList.filter((item) => item.href != "#");
    });
    // 监听控制台的内容在终端输出
    // page.on("console", function (arg) {
    //     console.log(arg);
    // });
    let cityPage = await browser.newPage();
    await cityPage.goto(`https://www.dygod.net/${res[2].href}`);
    console.log(res);
})();
