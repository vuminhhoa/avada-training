import React, {useState} from 'react';
import {
  Layout,
  Page,
  SettingToggle,
  TextStyle,
  ResourceList,
  ResourceItem,
  Stack,
  Avatar,
  Pagination
} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import moment from 'moment';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const items = [
    {
      id: '100',
      firstName: '#',
      city: 'Mae Jemison',
      productName: 'Decatur, USA',
      country: 'Decatur, USA',
      productId: 'Decatur, USA',
      timestamp: `${new Date()}`,
      productImage:
        'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'
    },
    {
      id: '101',
      firstName: 'asfdfsdfasdf2',
      city: 'Mae Jemison',
      productName: 'Decatur, USA',
      country: 'Decatur, USA',
      productId: 'Decatur, USA',
      timestamp: `${new Date()}`,
      productImage:
        'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'
    },
    {
      id: '102',
      firstName: 'testststes',
      city: 'Mae Jemison',
      productName: 'Decatur, USA',
      country: 'Decatur, USA',
      productId: 'Decatur, USA',
      timestamp: `${new Date()}`,
      productImage:
        'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'
    }
  ];

  return (
    <Page title="Notifications" fullWidth="true" subtitle="List of sales notifcation from Shopify">
      <Layout>
        <Layout.Section>
          <ResourceList
            selectable
            // sortValue={sortValue}
            sortOptions={[
              {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
              {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
            ]}
            resourceName={{singular: 'notification', plural: 'notifications'}}
            items={items}
            renderItem={item => {
              const {
                id,
                firstName,
                city,
                productName,
                country,
                productId,
                timestamp,
                productImage
              } = item;

              return (
                <ResourceItem>
                  <Stack distribution="equalSpacing">
                    <NotificationPopup
                      firstName={firstName}
                      city={city}
                      country={country}
                      productName={productName}
                      timestamp={timestamp}
                      productImage={productImage}
                    />
                    <div style={{textAlign: 'right'}}>
                      From {moment(timestamp).format('MMMM DD,')}
                      <br />
                      {moment(timestamp).format('YYYY')}
                    </div>
                  </Stack>
                </ResourceItem>
              );
            }}
          />
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Pagination />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
