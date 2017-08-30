import { databaseURL } from '../configs';

class DataBase {
  constructor(base, configs) {
    this.base = base;
    this.base.initializeApp(configs);
  }

  orderPaidRef(orderId) {
    const url = `orders/${orderId}/public/paid`;
    return this.base.database().ref(url);
  }
}

export default new DataBase(window.firebase, { databaseURL });
