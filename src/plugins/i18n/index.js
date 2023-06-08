import { createI18n } from "vue-i18n";
import en from "@/locales/en/index.js";
import ka from "@/locales/ka/index.js";

const messages = {
  en,
  ka,
};

const i18n = createI18n({
  legacy:false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;