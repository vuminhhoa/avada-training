import React, {useState, useCallback} from 'react';
import {
  Layout,
  Page,
  TextStyle,
  Card,
  Tabs,
  Checkbox,
  TextField,
  Select,
  FormLayout,
  SkeletonBodyText
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import defaultSettings from '@avada/functions/src/const/settings/defaultSetting';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import RangeSliderWithText from '../../components/RangeSliderWithText/RangeSliderWithText';

/**
 * Render a setting page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Settings() {
  const {data: settings, handleChangeInput, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);
  const {editing, handleEdit} = useEditApi({url: '/settings'});

  const tabs = [
    {
      id: 'display',
      title: 'APPEARANCE',
      content: 'Display',
      body: (
        <FormLayout>
          <DesktopPositionInput
            label="Desktop position"
            helpText="The display position of all the pop on your website."
            value={settings.position}
            onChange={val => handleChangeInput('position', val)}
          />
          <Checkbox
            label="Hide time ago"
            checked={settings.hideTimeAgo}
            onChange={val => handleChangeInput('hideTimeAgo', val)}
          />
          <Checkbox
            label="Truncate content text"
            helpText="If your product name is long for one line. It will be truncated to 'Product na...'"
            checked={settings.truncateProductName}
            onChange={val => handleChangeInput('truncateProductName', val)}
          />
          <TextStyle variation="strong">TIMING</TextStyle>

          <FormLayout.Group>
            <RangeSliderWithText
              label="Display duration"
              value={settings.displayDuration}
              helpText="How long each pop will display on your page."
              type="number"
              onChange={val => handleChangeInput('displayDuration', val)}
              suffix="second(s)"
              min={1}
            />
            <RangeSliderWithText
              label="Gap time between two pops"
              value={settings.popsInterval}
              helpText="The time interval between two popup notifications."
              type="number"
              onChange={val => handleChangeInput('popsInterval', val)}
              suffix="second(s)"
              min={1}
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <RangeSliderWithText
              label="Time before the first pop"
              value={settings.firstDelay}
              helpText="The delay time before the first notification."
              type="number"
              onChange={val => handleChangeInput('firstDelay', val)}
              suffix="second(s)"
              min={1}
            />
            <RangeSliderWithText
              label="Maximum of popups"
              value={settings.maxPopsDisplay}
              helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
              type="number"
              onChange={val => handleChangeInput('maxPopsDisplay', val)}
              suffix="pop(s)"
              max={80}
            />
          </FormLayout.Group>
        </FormLayout>
      )
    },
    {
      id: 'trigger',
      title: 'PAGES RESTRICTION',
      content: 'Triggers',
      body: (
        <FormLayout>
          <Select
            value={settings.allowShow}
            options={[
              {
                label: 'All pages',
                value: 'all'
              },
              {label: 'Specific pages', value: 'specific'}
            ]}
            onChange={val => handleChangeInput('allowShow', val)}
          />

          <TextField
            multiline={4}
            value={settings.excludedUrls}
            helpText="Page URLs NOT to show the pop-up (separated by new lines)"
            label="Excluded pages"
            onChange={val => handleChangeInput('excludedUrls', val)}
          />

          {settings.allowShow === 'specific' ? (
            <TextField
              multiline={4}
              helpText="Page URLs to show the pop-up (separated by new lines)"
              label="Included Pages"
              value={settings.includedUrls}
              onChange={val => handleChangeInput('includedUrls', val)}
            />
          ) : null}
        </FormLayout>
      )
    }
  ];

  if (loading) {
    return (
      <Page
        title="Settings"
        fullWidth="true"
        subtitle="Decide how your notifications will display"
        primaryAction={{
          content: 'SAVE',
          disabled: loading
        }}
      >
        <Layout>
          <Layout.Section oneThird>
            <Card>
              <Card.Section>
                <SkeletonBodyText lines={4} />
              </Card.Section>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Card.Section>
                <SkeletonBodyText lines={1} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={10} />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page
      title="Settings"
      fullWidth="true"
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'SAVE',
        loading: editing,
        onAction: () => handleEdit(settings, true)
      }}
    >
      <Layout>
        <Layout.Section oneThird>
          <NotificationPopup
            hideTimeAgo={settings.hideTimeAgo}
            truncateProductName={settings.truncateProductName}
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card.Section title={tabs[selected].title}>{tabs[selected].body}</Card.Section>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
