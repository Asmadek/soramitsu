import { CurrencyName } from "@/logic/classes";

class Converter {
  currencyFrom: CurrencyName;
  currencyTo: CurrencyName;

  constructor(from: CurrencyName, to: CurrencyName) {
    this.currencyFrom = from;
    this.currencyTo = to;
  }

  public setCurrencyFrom(currency: CurrencyName) {
    this.currencyFrom = currency;
  }

  public setCurrencyTo(currency: CurrencyName) {
    this.currencyTo = currency;
  }
}
