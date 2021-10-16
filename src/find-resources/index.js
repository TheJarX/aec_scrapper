const { AECSelectors, sleep } = require('../utils/');
const { loginAsStudentBtnSelector } = require('../config');

const {
  resourcesTabsSelector,
  resourceTabItemSelector,
  resourcesItemsSelector,
  resourceItemSelector,
  resourceItemLinkSelector,
  categoriesContainerSelector,
  categoriesListSelector,
  experienceHeaderSelector,
  experienceTitleSelector,
} = AECSelectors;

const findResources = async (page) => {
  await page.click(loginAsStudentBtnSelector);
  await page.waitForSelector(resourcesItemsSelector);

  const resourcesItemsContainer = await page.$(resourcesItemsSelector);
  const resourcesItems = await resourcesItemsContainer.$$(resourceItemSelector) ;

  const resources = await Promise.all(resourcesItems.map(async (item) => {
    const resourceLinkElement = await item.$(resourceItemLinkSelector);
    const resourceLink = await resourceLinkElement.evaluate(link => link.getAttribute('href')); 
    const resourceTitle = await resourceLinkElement.evaluate(link => link.textContent); 

    await resourceLinkElement.dispose();

    return { link: resourceLink, title: resourceTitle };
  }));

  resourcesItemsContainer.dispose();

  // Get categories
  // I'm considering the experience title as a category
  const categoriesContainer = await page.$(categoriesContainerSelector);
  await sleep(1500); // The categories are rendered dynamically so we must wait
  const categoriesList = await categoriesContainer.$(categoriesListSelector);
  const categoriesArray = await categoriesList.evaluate(list => [...list.children].map(li => li.textContent));
  const experienceHeader = await page.$(experienceHeaderSelector);
  const experienceTitle = await (await experienceHeader.$(experienceTitleSelector)).evaluate(titleEl => titleEl.textContent);

  categoriesArray.pop()
  categoriesArray.push(experienceTitle);

  return {
    categories: categoriesArray,
    categoriesString: categoriesArray.join(', '),
    resoucesLinks: resources.map(res => res.link),
    resources,
  };
};

// TODO: move this somewhere else
const download = async (url) => {
  const downloader = new Downloader({
    url,
    directory: './downloads',
  });

  try {
    await downloader.download();
  } catch (e) {
    console.error(e);
  }
};

// TODO: move this somewhere else
const getTabs = async (page) => {
  await page.waitForSelector(resourcesTabsSelector);
  const tabs = await page.$(resourcesTabsSelector);
  const tabItems = await Promise.all((await tabs.$$(resourceTabItemSelector)).map(async (tabItem) => {
    return {
      element: tabItem,
      title: await tabItem.evaluate(itemElement => itemElement.textContent),
      select: tabItem.click, // it's recommended to sleep at least 1000ms after using this method
    };
  }));

  return tabItems;
};

module.exports = {
  findResources,
  getTabs,
};
