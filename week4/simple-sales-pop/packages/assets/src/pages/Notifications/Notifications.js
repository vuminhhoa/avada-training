import React, {useState} from 'react';
import {
  Layout,
  Page,
  ResourceList,
  ResourceItem,
  Stack,
  Pagination,
  Spinner,
  TextStyle,
  Card,
  EmptyState
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import moment from 'moment';
import useFetchApi from '../../hooks/api/useFetchApi';
import useDeleteApi from '../../hooks/api/useDeleteApi';
import defaultNotifications from '@avada/functions/src/const/notifications/defaultNotifications';
import usePaginate from '../../hooks/api/usePaginate';

/**
 * Render a notification page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {deleting, handleDelete} = useDeleteApi({url: '/notifications'});
  const [sortValue, setSortValue] = useState('timestamp:desc');
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    data: notifications,
    setData: setNotifications,
    loading,
    fetchApi: fetchNoti,
    count,
    setCount,
    fetched,
    onQueryChange,
    onQueriesChange,
    nextPage,
    prevPage,
    pageInfo: {hasPre, hasNext}
  } = usePaginate({
    url: '/notifications',
    defaultData: defaultNotifications,
    defaultLimit: 10,
    defaultSort: 'timestamp:desc'
  });
  console.log(hasNext, hasPre);
  const handleSelected = value => {
    setSelectedItems(value);
  };

  const promotedBulkActions = [
    {
      content: 'Delete',
      onAction: async () => {
        await handleDelete(selectedItems);
        setNotifications(prev => prev.filter(item => !selectedItems.includes(item.id)));
        setSelectedItems([]);
      }
    }
  ];

  if (loading) {
    return (
      <Page
        title="Notifications"
        fullWidth="true"
        subtitle="List of sales notifcation from Shopify"
      >
        <Layout>
          <Layout.Section>
            <Card>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <Spinner size="small" />
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page title="Notifications" fullWidth="true" subtitle="List of sales notifcation from Shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              items={notifications}
              loading={deleting}
              selectable
              sortValue={sortValue}
              selectedItems={selectedItems}
              onSelectionChange={handleSelected}
              promotedBulkActions={promotedBulkActions}
              resourceName={{singular: 'notification', plural: 'notifications'}}
              emptyState={
                <EmptyState
                  heading="No notifications"
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Your latest notifications will appear here</p>
                </EmptyState>
              }
              sortOptions={[
                {label: 'Newest update', value: 'timestamp:desc'},
                {label: 'Oldest update', value: 'timestamp:asc'}
              ]}
              onSortChange={sort => {
                setSortValue(sort);
                fetchNoti('/notifications', {limit: 30, order: sort});
              }}
              renderItem={item => {
                const date = new Date(
                  item.timestamp._seconds * 1000 + item.timestamp._nanoseconds / 1000000
                );
                return (
                  <ResourceItem id={item.id}>
                    <Stack distribution="equalSpacing">
                      <NotificationPopup
                        firstName={item.firstName}
                        city={item.city}
                        country={item.country}
                        productName={item.productName}
                        timestamp={date}
                        productImage={item.productImage}
                      />
                      <TextStyle>
                        From {moment(date).format('MMMM DD,')}
                        <br />
                        {moment(date).format('YYYY')}
                      </TextStyle>
                    </Stack>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section sectioned>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Pagination
              hasNext={hasNext}
              hasPrevious={hasPre}
              onNext={nextPage}
              onPrevious={prevPage}
            />
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
