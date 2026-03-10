import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");
  const toggleLanguage = () => setLocale((prev) => (prev === "en" ? "vi" : "en"));

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
