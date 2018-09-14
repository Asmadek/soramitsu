import { CurrencyName, HistoryData, CurrencyType } from "@/logic/classes";
import { getPriceUrl, getHistoryUrl } from "./constants";

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
