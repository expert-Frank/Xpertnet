import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import axios from "axios";

export const I18nContext = createContext(null);

interface TranslationGroup {
  [key: string]: string;
}

interface Translation {
  de: TranslationGroup;
  en: TranslationGroup;
}

export default function LocalizationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [translations, setTranslations] = useState<Translation | null>(null);
  const locale = location.pathname.split("/")[1];

  if (!["de", "en"].includes(locale))
    return <>The locale {locale} does not exist</>;

  useEffect(() => {
    const getTranslations = async () => {
      const translations = await axios.get("/api/localization");
      setTranslations(translations.data);
    };
    getTranslations();
  }, []);

  return (
    <I18nContext.Provider value={translations ? translations[locale] : null}>
      {children}
    </I18nContext.Provider>
  );
}
