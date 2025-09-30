import { useEffect } from "react";
import { useLocalStorageState } from "ahooks";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Input ,DatePicker} from "@douyinfe/semi-ui-19";
import zh_CN from "@douyinfe/semi-ui-19/lib/es/locale/source/zh_CN";
import en_GB from "@douyinfe/semi-ui-19/lib/es/locale/source/en_GB";

import "./App.css";
import { GlobalContext } from "./context";

function App() {
  const [lang, setLang] = useLocalStorageState("lang", {
    defaultValue: "zh_CN",
    listenStorageChange: true,
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => {
      try {
        return JSON.parse(value);
      } catch {
        // 如果解析失败，返回原始值
        return value;
      }
    },
  });

  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "light",
    listenStorageChange: true,
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => {
      try {
        return JSON.parse(value);
      } catch {
        // 如果解析失败，返回原始值
        return value;
      }
    },
  });

  const { i18n } = useTranslation();

  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute("theme-mode", "dark");
    } else {
      document.body.removeAttribute("theme-mode");
    }
  }, [theme]);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <GlobalContext.Provider value={{ lang, setLang, theme, setTheme }}>
      <ConfigProvider locale={lang == "zh_CN" ? zh_CN : en_GB}>
        <Input></Input>
        <DatePicker></DatePicker>
      </ConfigProvider>
    </GlobalContext.Provider>
  );
}

export default App;
