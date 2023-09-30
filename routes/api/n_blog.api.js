const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getNaverBlogs = async (req, res, next) => {
  // Launch the browser and open a new blank page
  const results = [];
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  // Navigate the page to a URL
  console.log(req.query.keyword);
  await page.goto(
    `https://search.naver.com/search.naver?where=view&sm=tab_jum&query=${req.query.keyword}`
  );
  const content = await page.content();
  const $ = cheerio.load(content);

  const lists = $(
    '#main_pack > section > div > div._list > panel-list > div:nth-child(1) > more-contents > div > ul > li:nth-child(n) > div.total_wrap.api_ani_send > div > a'
  );
  lists.each((index, list) => {
    const link = list.attribs.href.split('/');
    if (link[2].includes('blog')) {
      console.log(index);
      console.log(`${link[3]}@naver.com`);
      results.push(`${link[3]}@naver.com`);
    }
  });

  await browser.close();

  res.send(results);
};

module.exports = getNaverBlogs;
