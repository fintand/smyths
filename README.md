## What is this?
Node script that runs every 2 mins. Starts a chrome instance with puppeteer and checks the
product of your choice and adds it to the basket. It will send text messages to notify that
the product is in stock. #IWANTAPS5

# Getting started
1. Get twilio credentials
2. Get smyths.ie credentials
3. Create .env file and add variables
4. Change SMYTHS_TOYS_PATH to whatever you want
5. npm install
6. Run on a server using something like pm2

## Example .env file
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=XXXXXXXXXXXXX
TWILIO_NUMBER_TO=+353XXXXXXXX
TWILIO_NUMBER_FROM=+1XXXXXXXXXX

SMYTHS_USERNAME=XXXXXXX@gmail.com
SMYTHS_PASSWORD=XXXXXXXXXX

## Note
It will send 2 texts if successful. Log in with account credentials and product should be in basket
