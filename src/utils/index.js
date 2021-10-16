const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const AECSelectors = {
  resourcesTabsSelector       : '[data-tour*="resources-section"]',
  resourceTabItemSelector     : '.aec-tab-item__label',
  resourcesItemsSelector      : '[data-tour*="resources-items"]',
  resourceItemSelector        : '[data-testid*="resource"]',
  resourceItemLinkSelector    : '[class*="link"]',
  categoriesContainerSelector : '[data-testid*="experiences-navigation"]',  
  categoriesListSelector      : 'ol.aec-breadcrumb__list',
  experienceHeaderSelector    : '.resources__header',
  experienceTitleSelector     : '[data-testid*="typography"]',
};

module.exports = {
  sleep,
  AECSelectors,
};
