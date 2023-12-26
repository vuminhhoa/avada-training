import React, {useState} from 'react';
import {
  Layout,
  Page,
  ResourceList,
  ResourceItem,
  Stack,
  Pagination,
  Spinner
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import moment from 'moment';
import useFetchApi from '../../hooks/api/useFetchApi';
import useDeleteApi from '../../hooks/api/useDeleteApi';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */

const items = [
  {
    id: '100',
    firstName: '#',
    city: 'Mae Jemison',
    productName: 'Decatur, USA',
    country: 'Decatur, USA',
    productId: 'Decatur, USA',
    timestamp: `Wed Dec 20 2023 11:47:26 GMT+0700 (Giờ Đông Dương)`,
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
    timestamp: `Tue Dec 19 2023 15:47:26 GMT+0700 (Giờ Đông Dương)`,
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

export default function Notifications() {
  const {data: notifications, setData: setNotifications, loading} = useFetchApi({
    url: '/notifications',
    defaultData: items
  });
  const {deleting, handleDelete} = useDeleteApi({url: '/notifications'});
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelected = sort => {
    setSelectedItems(sort);
  };
  const handleSort = sort => {
    const field = 'timestamp';
    if (sort == 'DATE_MODIFIED_DESC') {
      setNotifications(prev => {
        return prev.sort((a, b) => {
          if (!isNaN(Date.parse(b[field])) && !isNaN(Date.parse(a[field]))) {
            return Date.parse(b[field]) - Date.parse(a[field]);
          }
          return b[field] - a[field];
        });
      });
    } else if (sort == 'DATE_MODIFIED_ASC') {
      setNotifications(prev => {
        return prev.sort((a, b) => {
          if (!isNaN(Date.parse(a[field])) && !isNaN(Date.parse(b[field]))) {
            return Date.parse(a[field]) - Date.parse(b[field]);
          }
          return a[field] - b[field];
        });
      });
    }
  };

  const bulkActions = [];
  const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: () => {
        handleDelete(selectedItems);
        setNotifications(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
      }
    }
  ];
  return (
    <Page title="Notifications" fullWidth="true" subtitle="List of sales notifcation from Shopify">
      {loading || deleting ? (
        <div className="PreLoading PreLoading-Spinner">
          <Spinner />
        </div>
      ) : (
        <Layout>
          <Layout.Section>
            <ResourceList
              selectable
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              onSortChange={sort => {
                setSortValue(sort);
                handleSort(sort);
              }}
              bulkActions={bulkActions}
              selectedItems={selectedItems}
              onSelectionChange={handleSelected}
              promotedBulkActions={promotedBulkActions}
              resourceName={{singular: 'notification', plural: 'notifications'}}
              items={notifications}
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
                  <ResourceItem id={id}>
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
      )}
    </Page>
  );
}
