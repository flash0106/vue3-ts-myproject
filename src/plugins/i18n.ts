import type { App } from "vue";
import i18n from "@/lang";

export function setupI18n(app: App<Element>) {
  app.use(i18n);
}
