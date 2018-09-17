const SERVER_URL = `https://min-api.cryptocompare.com`;
const PRICE_URL = `${SERVER_URL}/data/price`;
const HISTORY_URL = `${SERVER_URL}/data/histoday`;

const getPriceUrl = (from: string, to: string) => {
  return `${PRICE_URL}?fsym=${from}&tsyms=${to}`;
};

const getHistoryUrl = (from: string, to: string, limit: number) => {
  return `${HISTORY_URL}?fsym=${from}&tsym=${to}&limit=${limit}`;
};

const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response: Response) => response.json();

export class CurrencyDataAPI {
  static getPrice(from: string, to: string) {
    return fetch(getPriceUrl(from, to))
      .then(checkStatus)
      .then(toJSON);
  }

  static getHistory(from: string, to: string, limit: number = 10) {
    return fetch(getHistoryUrl(from, to, limit))
      .then(checkStatus)
      .then(toJSON);
  }
}
