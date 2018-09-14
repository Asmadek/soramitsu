export enum Cryptocurrencies {
  BTC = 'BTC',
  DASH = 'DASH',
  ETH = 'ETH',
  LTC = 'LTC',
}

export enum Fiatcurrencies {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
  JPY = 'JPY',
  CNY = 'CNY',
}

export enum CurrencyType {
  CRYPTO,
  FIAT,
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
  };
}
