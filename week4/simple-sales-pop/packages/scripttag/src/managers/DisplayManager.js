import {insertAfter} from '../helpers/insertHelpers';
import {h, render} from 'preact';
import React from 'preact/compat';
import lazy from 'preact-lazy';
// import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
const NotificationPopup = lazy(() => import('../components/NotificationPopup/NotificationPopup'));
import checkUrlAllowShow from '../helpers/checkUrl';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;

    // My display logic here
    const href = window.location.href.replace(/[?#].*$/g, '');

    const allowShowPop = checkUrlAllowShow({
      url: href,
      allowShow: settings.allowShow,
      includedUrls: settings.includedUrls,
      excludedUrls: settings.excludedUrls
    });

    if (allowShowPop) {
      this.insertContainer(settings.position);
      await this.delay(settings.firstDelay * 1000);
      for (let index = 0; index < settings.maxPopsDisplay; index++) {
        const currentNotification = notifications[index];
        if (!currentNotification) break;
        await this.displayOnePopup(currentNotification, settings);
      }
    }
  }
  async displayOnePopup(notification, settings) {
    this.display({notification});
    await this.delay(settings.displayDuration * 1000);
    this.fadeOut();
    await this.delay(settings.popsInterval * 1000);
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.classList.remove('fade-in');
  }

  display({notification}) {
    const container = document.querySelector('#Avada-SalePop');
    container.classList.add('fade-in');
    render(
      <NotificationPopup
        {...notification}
        hideTimeAgo={this.settings.hideTimeAgo}
        truncateProductName={this.settings.truncateProductName}
      />,
      container
    );
  }

  insertContainer(position) {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper', position);
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
