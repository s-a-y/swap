import { api } from '../configs';
import requestUtil from '../utils/request';

function buildCurrencyParam(currency, amount) {
  if (!amount) {
    return currency;
  }

  return amount === 1 ? currency : `${amount}/${currency}`;
}

function optionalToParams(optional) {
  return Object
    .keys(optional)
    .map(key => `${key}=${optional[key]}`)
    .join('&');
}

class Sender {
  constructor(request) {
    this.api = api;
    this.request = request;
  }

  getRates(currencyFrom, currencyTo, amountTo) {
    const fromParam = buildCurrencyParam(currencyFrom);
    const toParam = buildCurrencyParam(currencyTo, amountTo);
    const url = `${this.api}/rates?from=${fromParam}&to=${toParam}`;
    return this.request.get(url);
  }

  getTransfer(currencyFrom, currencyTo, amountTo, address, optional) {
    const fromParam = buildCurrencyParam(currencyFrom);
    const toParam = buildCurrencyParam(currencyTo, amountTo);
    let url = `${this.api}/orders?from=${fromParam}&to=${toParam}&address=${address}`;
    if (optional) {
      url += optionalToParams(optional);
    }
    return this.request.get(url);
  }
}

export default new Sender(requestUtil);
