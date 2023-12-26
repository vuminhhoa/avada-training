import React, {useState, useCallback} from 'react';
import {
  Layout,
  Page,
  TextStyle,
  Stack,
  Card,
  Tabs,
  Checkbox,
  RangeSlider,
  TextField,
  Select,
  Button,
  Spinner
} from '@shopify/polaris';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import defaultSettings from '../../../../functions/src/const/settings/defaultSetting';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';

/**
 * Render a home page for overview
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

  const selectOptions = [
    {
      label: 'All pages',
      value: 'all'
    },
    {label: 'Specific pages', value: 'specific'}
  ];

  const tabs = [
    {
      id: 'display',
      title: 'APPEARANCE',
      content: 'Display',
      accessibilityLabel: 'All customers',
      body: (
        <Stack vertical="true">
          <DesktopPositionInput
            label="Desktop position"
            value={settings.position}
            helpText="The display position of all the pop on your website."
            onChange={val => handleChangeInput('position', val)}
          />

          <Checkbox
            checked={settings.hideTimeAgo}
            label="Hide time ago"
            onChange={val => handleChangeInput('hideTimeAgo', val)}
          />
          <Checkbox
            label="Truncate content text"
            checked={settings.truncateProductName}
            helpText="If your product name is long for one line. It will be truncated to 'Product na...'"
            onChange={val => handleChangeInput('truncateProductName', val)}
          />
          <TextStyle variation="strong">TIMING</TextStyle>
          <div
            style={{
              display: 'flex',
              gap: '20px'
            }}
          >
            <div
              style={{
                width: '60%'
              }}
            >
              <RangeSlider
                label="Display duration"
                value={settings.displayDuration}
                output
                helpText="How long each pop will display on your page."
                onChange={val => handleChangeInput('displayDuration', val)}
              />
            </div>
            <TextField
              suffix="second(s)"
              type="number"
              value={String(settings.displayDuration)}
              onChange={val => handleChangeInput('displayDuration', val)}
            />

            <div
              style={{
                width: '60%'
              }}
            >
              <RangeSlider
                label="Gap time between two pops"
                output
                value={settings.popsInterval}
                helpText="The time interval between two popup notifications."
                onChange={val => handleChangeInput('popsInterval', val)}
              />
            </div>
            <TextField
              suffix="second(s)"
              type="number"
              value={String(settings.popsInterval)}
              onChange={val => handleChangeInput('popsInterval', val)}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px'
            }}
          >
            <div
              style={{
                width: '60%'
              }}
            >
              <RangeSlider
                label="Time before the first pop"
                value={settings.firstDelay}
                output
                helpText="The delay time before the first notification."
                onChange={val => handleChangeInput('firstDelay', val)}
              />
            </div>
            <TextField
              suffix="second(s)"
              type="number"
              value={String(settings.firstDelay)}
              onChange={val => handleChangeInput('firstDelay', val)}
            />
            <div
              style={{
                width: '60%'
              }}
            >
              <RangeSlider
                label="Maximum of popups"
                value={settings.maxPopsDisplay}
                output
                helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
                onChange={val => handleChangeInput('maxPopsDisplay', val)}
                max="80"
              />
            </div>
            <TextField
              suffix="pop(s)"
              type="number"
              value={String(settings.maxPopsDisplay)}
              onChange={val => handleChangeInput('maxPopsDisplay', val)}
            />
          </div>
        </Stack>
      )
    },
    {
      id: 'trigger',
      title: 'PAGES RESTRICTION',
      content: 'Triggers',
      body: (
        <Stack vertical="true">
          <Select
            value={settings.allowShow}
            options={selectOptions}
            onChange={val => handleChangeInput('allowShow', val)}
          ></Select>
          {settings.allowShow === 'all' ? (
            <TextField
              multiline={4}
              value={settings.excludedUrls}
              helpText="Page URLs NOT to show the pop-up (separated by new lines)"
              label="Excluded pages"
              onChange={val => handleChangeInput('excludedUrls', val)}
            />
          ) : (
            <div>
              <TextField
                multiline={4}
                helpText="Page URLs to show the pop-up (separated by new lines)"
                label="Included Pages"
                value={settings.includedUrls}
                onChange={val => handleChangeInput('includedUrls', val)}
              />
              <br />
              <TextField
                multiline={4}
                helpText="Page URLs NOT to show the pop-up (separated by new lines)"
                label="Excluded Pages"
                value={settings.excludedUrls}
                onChange={val => handleChangeInput('excludedUrls', val)}
              />
            </div>
          )}
        </Stack>
      )
    }
  ];

  return (
    <Page
      title="Settings"
      fullWidth="true"
      subtitle="Decide how your notifications will display"
      primaryAction={
        <Button size="large" onClick={() => handleEdit(settings, true)} disabled={editing}>
          SAVE
        </Button>
      }
    >
      {loading || editing ? (
        <div className="PreLoading PreLoading-Spinner">
          <Spinner />
        </div>
      ) : (
        <Layout>
          <Layout.Section oneThird>
            <NotificationPopup
              firstName="testststes"
              city="Mae Jemison"
              country="Decatur, USA"
              productName="If your product name is long for one line. It will be truncated to 'Product na...'"
              timestamp={`${new Date()}`}
              productImage="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              settings={{
                hideTimeAgo: settings.hideTimeAgo,
                truncateProductName: settings.truncateProductName
              }}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section
                  title={tabs[selected].title}
                  children={tabs[selected].body}
                ></Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}
