import { CurrencyName } from "@/logic/classes";

const SERVER_URL = `https://min-api.cryptocompare.com`;
const PRICE_URL = `${SERVER_URL}/data/price`;
const HISTORY_URL = `${SERVER_URL}/data/histoday`;

export const getPriceUrl = (from: string, to: string) => {
  return `${PRICE_URL}?fsym=${from}&tsyms=${to}`;
};

export const getHistoryUrl = (from: string, to: string, limit: number) => {
  return `${HISTORY_URL}?fsym=${from}&tsym=${to}&limit=${limit}`;
};
