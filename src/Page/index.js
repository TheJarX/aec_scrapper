const puppeteer = require('puppeteer');
const { getPuppeteerOptions } = require('../config');

class Page {
  _browser = null;

  constructor(urlToFetch, initFn) {
    return this.#init(urlToFetch).then(() => initFn.call(this, this._page, this._browser)); 
  }

  // TODO: When the url is different assing again #browser
  async #init(urlToFetch) {
    this._browser ||= await puppeteer.launch(getPuppeteerOptions());
    this._page = await this._browser.newPage();

    await this._page.goto(urlToFetch, { waitUntil: 'networkidle2' }); // avoid stuff like analytics...

  }

}

module.exports = Page;
