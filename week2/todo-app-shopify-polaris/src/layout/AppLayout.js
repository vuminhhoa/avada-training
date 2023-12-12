import React from "react";
import { Frame, TopBar } from "@shopify/polaris";
import Todo from "../components/Todo/Todo";
import "./AppLayout.css";

const AppLayout = () => {
  const logo = {
    width: 150,
    topBarSource: "https://cdn1.avada.io/logo/avada_logo_final_color.png",
  };
  const userMenuMarkup = <TopBar.UserMenu name="HoaVM" initials="H" />;

  const topBarMarkup = (
    <TopBar showNavigationToggle userMenu={userMenuMarkup} />
  );

  return (
    <Frame logo={logo} topBar={topBarMarkup}>
      <Todo />
    </Frame>
  );
};

export default AppLayout;
