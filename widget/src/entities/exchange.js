export default class Exchange {
  constructor(token) {
    this.token = token;
    this.currencyFrom = 'BTC';
    this.currencyTo = 'XLM';
    this.amountTo = 1460;
    this.amountFrom = null;
    this.account = null;
    this.accountAddress = null;
    this.address = null;
    this.qr = null;
    this.extra1 = null;
    this.extra2 = null;
    this.disableExtra = null;
    this.refundAddress = null;
    this.email = null;
  }
}
