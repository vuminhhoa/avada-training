import React from "react";
import { AppProvider } from "@shopify/polaris";
import AppLayout from "./layout/AppLayout";
import en from "@shopify/polaris/locales/en.json";
const App = () => {
  return (
    <AppProvider i18n={en}>
      <AppLayout />
    </AppProvider>
  );
};

export default App;
