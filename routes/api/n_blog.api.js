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
    '#main_pack > section > div > div._list > panel-list > div > more-contents > div > ul > li:nth-child(n) > div.total_wrap.api_ani_send > div > a'
  );

  lists.each((index, list) => {
    if (list.attribs.href.split('/')[2].includes('blog')) {
      const postLink = list.attribs.href;
      const email = `${list.attribs.href.split('/')[3]}@naver.com`;
      const titleL = $(list).text();

      console.log(titleL);
      results.push(`<td>${titleL}</td><td>${postLink}</td> <td>${email}</td>`);
    }
  });

  await browser.close();

  res.send(results);
};

module.exports = getNaverBlogs;
