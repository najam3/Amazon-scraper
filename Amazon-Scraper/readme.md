## Web Scrapper using Pupetteer ##


## Run Script ##
* cd amazon-scraper
* npm run start 
 
 ## PageController File runs browser Instance ## 

* pageController executes scraping procces, it takes in an instance of browser to control pagesScrapper.js file,
which is where all the scraping scripts executes. You can open chromium and navigate to a [page]

## browser.js File has the function that launches the browser ##
*  It takes in the file that runs the browser which is the exported to be used in the index.js File

## pageController which passes the browser instance to the pageScraper object which executes all the scripts. ##

