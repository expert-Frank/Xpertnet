import { useContext } from "react";

import { I18nContext } from "@/components/localizationProvider";

export default function useTranslation() {
  const translations = useContext(I18nContext);

  const t = (key: string) => {
    if (!translations) return "";
    const parts = key.split(".");

    return translations[parts[0]][parts[1]];
  };

  return t;
}

export function useLocale() {
  return location.pathname.split("/")[1];
}
