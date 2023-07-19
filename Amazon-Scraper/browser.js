const puppeteer = require('puppeteer');
// Go to readme.md file to check the run script
const startBrowser = async () => {
    let browser;
    try {
           console.log('browser starting...')
           browser = await puppeteer.launch({
           headless: false,
           args: ["--disale-setuid-sandbox"],
          'ignoreHTTPSErrors': true,
       })

    }
    catch(err) {
      console.log('could not create browser instance =>', err)
    }
   return browser;
}


module.exports = { startBrowser };