import Help from './help/help.vue';
import StartOver from './start-over/start-over.vue';
import Payment from './payment/payment.vue';
import Transfer from './transfer/transfer.vue';

export default {
  props: ['address', 'qr'],
  data() {
    return {
      paymentReceived: false,
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
    confirmPayment() {
      this.paymentReceived = true;
    },
  },
};
