const env = process.env.NODE_ENV || 'development';
const defaultViewport = { height:  720, width: 1280 };

const getPuppeteerOptions = () => (
   env === 'development'
  ? { headless: false, defaultViewport }
  : {}
);

const loginAsStudentBtnSelector = 'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div > div > div:nth-child(6) > button'; // declared: Sun 29 Aug 2021 (this might change)

module.exports = {
  getPuppeteerOptions,
  loginAsStudentBtnSelector, 
};
