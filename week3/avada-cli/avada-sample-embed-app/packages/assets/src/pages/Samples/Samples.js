import React from 'react';
import {Card, IndexTable, Layout, Page, TextStyle, useIndexResourceState} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';

/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Samples() {
  const {data: todos, loading} = useFetchApi({url: '/samples'});

  const {selectedResources, handleSelectionChange} = useIndexResourceState(todos);

  return (
    <Page title="Samples" breadcrumbs={[{url: '/'}]}>
      <Layout>
        <Layout.Section>
          <Card>
            <IndexTable
              resourceName={{singular: 'todo', plural: 'todos'}}
              itemCount={todos.length}
              selectedItemsCount={selectedResources.length}
              onSelectionChange={handleSelectionChange}
              headings={[{title: 'Title'}]}
              loading={loading}
            >
              {todos.map(({id, title}, index) => (
                <IndexTable.Row
                  id={id}
                  key={id}
                  position={index}
                  selected={selectedResources.includes(id)}
                >
                  <IndexTable.Cell>
                    <TextStyle variation="strong">{title}</TextStyle>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
