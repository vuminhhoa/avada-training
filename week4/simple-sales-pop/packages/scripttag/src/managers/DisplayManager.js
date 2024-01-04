import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';
// import NotificationPopup from '../../../assets/src/components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer(settings.position);

    // Your display logic here

    await this.delay(settings.firstDelay * 1000);
    for (let index = 0; index < settings.maxPopsDisplay; index++) {
      const currentNotification = notifications[index];
      if (!currentNotification) break;
      this.display({notification: currentNotification});
      await this.delay(settings.displayDuration * 1000);
      this.fadeOut();
      await this.delay(settings.popsInterval * 1000);
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    // container.innerHTML = '';
    container.classList.add('fade-out');
    setTimeout(() => {
      container.classList.remove('fade-in', 'fade-out');
      render(<></>, container);
    }, 500); // Thời gian transition (500ms) - điều này cần phải giống với thời gian transition trong CSS
    // render(<></>, container);
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
