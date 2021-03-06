import database from '../../services/database';

import Help from './help/help.vue';
import StartOver from './start-over/start-over.vue';
import Payment from './payment/payment.vue';
import Transfer from './transfer/transfer.vue';

export default {
  props: ['exchange'],
  data() {
    return {
      paymentReceived: false,
      txIn: null,
      txOut: null,
      currencyFrom: this.exchange.currencyFrom,
      amountFrom: this.exchange.amountFrom,
      accountAddress: this.exchange.accountAddress,
      address: this.exchange.address,
      extra1: this.exchange.extra1,
      extra2: this.exchange.extra2,
      id: this.exchange.id,
    };
  },
  components: {
    Help,
    StartOver,
    Payment,
    Transfer,
  },
  methods: {
    handlerReset() {
      this.$emit('reset');
    },
  },
  created() {
    this.orderRef = database.orderPublicRef(this.id);
    this.orderRef.on('value', (snapshot) => {
      const value = snapshot.val();
      this.paymentReceived = Boolean(value.paid);
      this.txIn = value.txs.in;
      this.txOut = value.txs.out;
    });
  },
  destroyed() {
    this.orderRef.off();
  },
};
