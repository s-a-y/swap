import { api } from '../configs';
import requestUtil from '../utils/request';

function buildCurrencyParam(currency, amount) {
  if (!amount) {
    return currency;
  }

  return amount === 1 ? currency : `${amount}/${currency}`;
}

class Sender {
  constructor(request) {
    this.api = api;
    this.request = request;
  }

  getRates(currencyFrom, currencyTo, amount) {
    const fromParam = buildCurrencyParam(currencyFrom);
    const toParam = buildCurrencyParam(currencyTo, amount);
    const url = `${this.api}/rates?from=${fromParam}&to=${toParam}`;
    return this.request.get(url);
  }
}

export default new Sender(requestUtil);
