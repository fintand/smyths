require('dotenv').config()
const puppeteer = require('puppeteer');
const cron = require('node-cron');

const { addToBasket, clearCookiesPopup, checkStock, doLogin, sendSuccessText } = require('./utils');

cron.schedule('*/2 * * * *', async () => {
  console.log('running a task every 2 minutes');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const isInStock = await checkStock(page);
    if (isInStock) {
        sendSuccessText('Smyths PS5: Time to BUY BUY BUY');
        await clearCookiesPopup(page);
        await addToBasket(page);
        await doLogin(page);
    }
    await browser.close();
});