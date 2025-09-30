import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./en-US";
import zhCN from "./zh-CN";

export const LOCALE_OPTIONS = [
  { label: "中文", value: "zh-CN" },
  { label: "English", value: "en-US" },
];

export const defaultLocale = localStorage.getItem("lang") || "zh-CN";

const resources = {
  "en-US": { translation: { ...enUS } },
  "zh-CN": { translation: { ...zhCN } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLocale,
  fallbackLng: "zh-CN",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
