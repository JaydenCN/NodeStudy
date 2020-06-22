let puppeteer = require("puppeteer");
//启动浏览器
(async () => {
    // puppeteer.launch([{}]); 可以传一个对象
    //{ headless: false }可以配置为(有/无)界面浏览器
    //defaultViewport: { width: 500, height: 500 } 设置宽高
    // 操作延迟 slowMO:———
    // tiemout :设置超时
    let browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    //打开页面
    let page = await browser.newPage();
    //页面地址
    await page.goto("https://www.dytt8.net/index.htm");
    // 一个对象一个$ 多个$$
    // let elementHandle = await page.$$("#menu li a");
    // elementHandle[2].click();
    let elementInput = await page.$(".searchl .formhue");
    // 光标聚焦输入框
    await elementInput.focus();
    // 输入内容
    await page.keyboard.type("钢铁侠");
    // 点击事件
    await (await page.$(".searchr input[name='Submit']")).click();
    await (await page.$(".searchr input[name='Submit']")).click();
})();
