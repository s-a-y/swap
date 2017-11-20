import { api } from '../configs';
import requestUtil from '../utils/request';

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

  getRates(fromAsset, toAsset, toAmount, token) {
    const url = `${this.api}/rates?fromAsset=${fromAsset}&toAsset=${toAsset}&toAmount=${toAmount}&token=${token}`;
    return this.request.get(url);
  }

  getTransfer(fromAsset, toAsset, toAmount, address, optional) {
    let url = `${this.api}/orders?fromAsset=${fromAsset}&toAsset=${toAsset}&toAmount=${toAmount}&address=${address}`;
    if (optional) {
      url += `&${optionalToParams(optional)}`;
    }
    return this.request.get(url);
  }

  getFederation(account) {
    const url = `${this.api}/federation?q=${account}`;
    return this.request.get(url);
  }
}

export default new Sender(requestUtil);
