const { join } = require('path')
const express = require('express');
const app = express();
const Page = require('./src/Page');
const { findResources } = require('./src/find-resources');
const { sleep } = require('./src/utils');
// Not sure if it's that efficient to use a constructor like this...
const init = async (url) => new Page(url, async function(page, browser) {
  await sleep(1500);
  const results = await findResources(page);
  browser.close();
  return results;
});  


