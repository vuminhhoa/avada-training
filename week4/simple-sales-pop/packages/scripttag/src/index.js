import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, settings} = await apiManager.getNotifications();

  const href = window.location.href;
  const allowShow = settings.allowShow;

  const excludedUrls = settings.excludedUrls
    .replace(/\s/g, '')
    .split('https')
    .map(url => `https${url}`);

  const includedUrls = settings.includedUrls
    .replace(/\s/g, '')
    .split('https')
    .map(url => `https${url}`);

  if (
    (allowShow === 'all' && !excludedUrls.includes(href)) ||
    (allowShow === 'specific' && !excludedUrls.includes(href) && includedUrls.includes(href))
  ) {
    displayManager.initialize({notifications, settings});
  }
})();
