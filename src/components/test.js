const Genius = require('genius-lyrics-scrape');
const token = require('4wX_AIcVI8fQHIbkWY8z95hKj_23o_04j8FOVD79b-1g_m2GXuYzyfC7pHRDoacU');

const client = new Genius.Client(token);

client
  .searchAPI('Hello World')
  .then((searchRes) => {
    console.log('First Result:\n', searchRes.result[0]);
  })
  .catch((err) => console.err(err));

client
  .scrapeLyrics('https://genius.com/Travis-scott-sicko-mode-lyrics')
  .then((scraped) => console.log('Scraped Lyrics:\n', scraped))
  .catch((err) => console.err(err));
