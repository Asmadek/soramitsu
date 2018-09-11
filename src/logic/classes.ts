export enum Cryptocurrencies {
  BTC,
  DASH,
  ETH,
  LTC,
}

export enum Fiatcurrencies {
  RUB,
  USD,
  EUR,
  JPY,
  CNY,
}

export type CurrencyName = Cryptocurrencies | Fiatcurrencies;

export interface HistoryDataItem {
  time: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
}

export interface HistoryData {
  Response: string;
  Type: number;
  Aggregated: boolean;
  Data: Array<HistoryDataItem>;
  TimeTo: number;
  TimeFrom: number;
  FirstValueInArray: boolean;
  ConversionType: {
    type: string;
    conversionSymbol: string;
  }
}

export interface CurrencyPair {
  from: CurrencyName;
  to: CurrencyName;
  price: number;
  lastUpdate: number;
}