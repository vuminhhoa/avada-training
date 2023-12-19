import React from 'react';
import {Navigation} from '@shopify/polaris';
import {useHistory, useLocation} from 'react-router-dom';
import {
  ArrowLeftMinor,
  HomeMajor,
  SettingsMajor,
  ShareMinor,
  NotificationMajor,
  SettingsMinor
} from '@shopify/polaris-icons';
import '@assets/styles/layout/navigation.scss';
import {useStore} from '@assets/reducers/storeReducer';
import {isEmbeddedApp, prependRoute} from '@assets/config/app';
import getDomain from '@assets/helpers/getDomain';
import {getUrl} from '@assets/helpers/getUrl';

/**
 * @return {JSX.Element}
 * @constructor
 */
export default function AppNavigation() {
  const history = useHistory();
  const {pathname} = useLocation();
  const {state} = useStore();
  const {shop} = state;

  const isSelected = (route, isExact = true) => {
    if (typeof route === 'undefined') return false;
    const url = prependRoute(route);
    return isExact ? pathname === url : pathname.startsWith(url);
  };

  const prepareMenu = (menu, item) => {
    if (!item) return menu;

    const {subNavigationItems: subMenus, url, path, includeUrl} = item;

    if (!subMenus?.length) {
      menu.push({
        ...item,
        url: url || path,
        selected: isSelected(url) || isSelected(includeUrl) || isSelected(path, false)
      });
      return menu;
    }

    menu.push({
      url: subMenus[0].url,
      ...item,
      selected: isSelected(path || url, !path),
      subNavigationItems: subMenus.map(x => ({
        ...x,
        selected: isSelected(x.url, false) || isSelected(x.includeUrl, false)
      }))
    });
    return menu;
  };

  return (
    <Navigation location="">
      <Navigation.Section
        fill
        separator
        items={[
          {
            url: '/',
            icon: HomeMajor,
            label: 'Home',
            selected: location.pathname === getUrl('/'),
            onClick: () => {
              history.push('/');
            }
          },
          {
            url: '/notifications',
            icon: NotificationMajor,
            label: 'Notifications',
            selected: location.pathname === getUrl('/notifications'),
            onClick: () => {
              history.push('/notifications');
            }
          },
          {
            url: '/settings',
            icon: SettingsMinor,
            label: 'Settings',
            selected: location.pathname === getUrl('/samples'),
            onClick: () => {
              history.push('/samples');
            }
          }
        ].reduce(prepareMenu, [])}
      />
    </Navigation>
  );
}
