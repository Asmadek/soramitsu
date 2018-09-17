export enum Cryptocurrencies {
  BTC = "BTC",
  DASH = "DASH",
  ETH = "ETH",
  LTC = "LTC",
}

export enum Fiatcurrencies {
  RUB = "RUB",
  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  CNY = "CNY",
}

export enum CurrencyType {
  CRYPTO,
  FIAT,
}

export const HistoryRanges = [
  {
    text: "Week",
    value: 6,
  },
  {
    text: "Month",
    value: 30,
  },
  {
    text: "Quarter",
    value: 90,
  },
  {
    text: "Year",
    value: 364,
  },
];

export interface HistoryDataItem {
  time: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  change?: number;
}

export interface HistoryData {
  Response: string;
  Type: number;
  Aggregated: boolean;
  Data: HistoryDataItem[];
  TimeTo: number;
  TimeFrom: number;
  FirstValueInArray: boolean;
  ConversionType: {
    type: string;
    conversionSymbol: string;
  };
}
