const scraperObject = {
  url: 'http://amazon.com/deals',
  pageLimit: 5,
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, {
      timeout: 0,
      waitUntil: 'networkidle0'
    });

    // Get the links of the today's deal page
    const allLinks = []; // Array to store all the links

    let count = 0
    while (count <= this.pageLimit) {
      const links = await page.evaluate(() => {
        const arr = [];
        const linkElements = document.querySelectorAll('.DealCard-module__linkOutlineOffset_2fc037WfeGSjbFp1CAhOUn');
        linkElements.forEach(link => {
          arr.push(link.href);
        });

        return arr;
      });

      allLinks.push(...links);

      // Check if there is a next page button
      const hasNextPage = await page.evaluate(() => {
        const nextButton = document.querySelector('li.a-last > a');
        return nextButton ? true : false;
      });
      console.log('nextBtn', hasNextPage);
      
      if (!hasNextPage) {
        break;
      } 

      count+=1;
      await page.click('li.a-last > a');
      await page.waitForNavigation({
        timeout: 0,
        waitUntil: 'networkidle0'
      });
    }

   


    console.log(allLinks);
 
      let arr = [];
     for (let i = 0; i < allLinks.length; i++) {
      await page.goto(allLinks[i], { timeout: 0 });
   
      const product = await page.evaluate(() => {
        const getProducts = document.querySelector('.imgTagWrapper > img');
        const title = document.querySelector('span#productTitle');
        const spans = document.querySelectorAll('span.a-offscreen');
        const featureElements = document.querySelectorAll('div#feature-bullets > ul > li');
        let reviews = document.querySelector('div#averageCustomerReviews > span.a-declarative > span.reviewCountTextLinkedHistogram');
        let thumbnails = document.querySelectorAll('ul.regularAltImageViewLayout > li.imageThumbnail > span.a-list-item > span.a-button-thumbnail > span.a-button-inner > span.a-button-text > img');
        const features = [];
        
        let listPrice = null;
        for (const price of spans) {
          if (price.textContent.includes('$')) {
            listPrice = price;
            break;
          }
        }

        let thumbnailImgs = [];
        for ( const thumbnail of thumbnails ) {
              thumbnailImgs.push(thumbnail.src)
        }
     
        for (const feature of featureElements) {
          const featureContent = feature.innerText;
          features.push(featureContent);
        }

         

        if (getProducts && title  && listPrice && reviews && features && listPrice.innerText &&  reviews.innerText && getProducts.src &&  title.innerText ) {
          const objToPush = {
            image: getProducts.src,
            title: title.innerText,
            discountedPrice: listPrice.innerText,
            features: features,
            ratings: reviews.textContent
          };
          return objToPush;
        }
      });

      if (product) {
        arr.push(product);
      }
        // The Data being returned here....
        console.log('data',arr)
      }
  }
};

module.exports = scraperObject;
