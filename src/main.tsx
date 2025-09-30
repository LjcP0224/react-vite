import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";

import { store } from "@/store/index";
import i18n from "@/locale";
import "@/config/axios";
import "./index.css";
import App from "./App";

import { allThemeMap } from "@visactor/vchart-theme";
import { VChartCore } from "@visactor/react-vchart";
allThemeMap.forEach((theme, name) => {
  VChartCore.ThemeManager.registerTheme(name, theme);
});

createRoot(document.getElementById("root")!).render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>
);
