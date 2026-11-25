"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CURRENCY_COOKIE,
  CURRENCY_STORAGE_KEY,
  defaultCurrency,
  isCurrency,
  type Currency,
} from "@/lib/currency";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: defaultCurrency,
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Always start from the default so server and client markup match.
  const [currency, setCurrencyState] = useState<Currency>(defaultCurrency);

  useEffect(() => {
    const saved = document.documentElement.getAttribute("data-currency");
    if (isCurrency(saved)) setCurrencyState(saved);
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    document.documentElement.setAttribute("data-currency", next);
    try {
      localStorage.setItem(CURRENCY_STORAGE_KEY, next);
    } catch {
      /* storage can be unavailable (private mode) – cookie below still works */
    }
    document.cookie = `${CURRENCY_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);
