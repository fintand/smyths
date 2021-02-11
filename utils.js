const twilio = require('twilio');

// Paths
const SMYTHS_TOYS_PATH = 'https://www.smythstoys.com/ie/en-ie/video-games-and-tablets/playstation-5/playstation-5-consoles/playstation-5-console/p/191259';
// Test URL
//const SMYTHS_TOYS_PATH = 'https://www.smythstoys.com/ie/en-ie/video-games-and-tablets/nintendo-switch/nintendo-switch-consoles/nintendo-switch-lite-turquoise-%2b-animal-crossing-%2b-nintendo-switch-online-3-month-membership-bundle/p/195861';
const LOGIN_PATH = 'https://www.smythstoys.com/ie/en-ie/login';

const SUCCESS_TEXT = 'Add To Basket';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

const sendSuccessText = (body) => {
    client.messages.create({
        body,
        to: process.env.TWILIO_NUMBER_TO,  // Text this number
        from: process.env.TWILIO_NUMBER_FROM // From a valid Twilio number
    })
        .then((message) => console.log(message.sid));
};

const doLogin = async (page) => {
    await page.waitForTimeout(1000);
    await page.goto(LOGIN_PATH);

    await page.waitForSelector('#j_username');
    await page.type('#j_username', process.env.SMYTHS_USERNAME);
    await page.type('#j_password', process.env.SMYTHS_PASSWORD);
    await page.click('#loginSubmit');
    await page.waitForTimeout(4000);
    sendSuccessText('Smyths PS5: Successfully added to cart')
};

const addToBasket = async (page) => {
    await page.click('.addtocart-component #addToCartButton');
};

const clearCookiesPopup = async (page) => {
    await page.waitForSelector('#cookieLoad');
    await page.waitForTimeout(1000); // Wait for modal to appear
    await page.click('button.cookieProcessed');
    await page.waitForTimeout(1000); // Wait for modal to close
};

const checkStock = async (page) => {
    await page.goto(SMYTHS_TOYS_PATH);
    await page.screenshot({ path: 'product.png' });

    await page.waitForSelector('.addtocart-component');

    let textContent = '';
    try {
        textContent = await page.evaluate(() => {
            return document.querySelector('.addtocart-component #addToCartButton').innerText;
        });
    } catch (e) {}

    if (textContent === SUCCESS_TEXT) {
        console.log('BUY BUY BUY');
        return true;
    } else {
        console.log('SAD :(');
        return false;
    }
};

module.exports = {
    addToBasket,
    clearCookiesPopup,
    checkStock,
    doLogin,
    sendSuccessText,
};