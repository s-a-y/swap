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
      currencyFrom: this.exchange.currencyFrom,
      amountFrom: this.exchange.amountFrom,
      address: this.exchange.address,
      id: this.exchange.id,
      qr: this.exchange.qr,
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
    this.orderRef = database.orderPaidRef(this.id);
    this.orderRef.on('value', (snapshot) => {
      const value = snapshot.val();
      this.paymentReceived = Boolean(value);
    });
  },
  destroyed() {
    this.orderRef.off();
  },
};
