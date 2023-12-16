import React, {useState} from 'react';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const {dispatch} = useStore();

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <TextStyle>Our app is {enabled ? 'enabled' : 'disabled'} on your store</TextStyle>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
