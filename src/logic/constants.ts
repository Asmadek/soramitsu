import { CurrencyName } from "@/logic/classes";

const SERVER_URL = `https://min-api.cryptocompare.com`;
const PRICE_URL = `${SERVER_URL}/data/price`;
const HISTORY_URL = `${SERVER_URL}/data/histoday`;

const getCurrencyPriceUrl = (from: CurrencyName, to: CurrencyName) => {
  return `${PRICE_URL}?fsym=${from}&tsyms=${to}`;
};

const getHistoryUrl = (from: CurrencyName, to: CurrencyName, limit: number) => {
  return `${HISTORY_URL}?fsym=${from}&tsym=${to}&limit=${limit}`;
};
