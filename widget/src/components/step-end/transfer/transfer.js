import TransferAddress from './transfer-address/transfer-address.vue';

export default {
  props: ['currencyFrom', 'amountFrom', 'address', 'qr'],
  components: {
    TransferAddress,
  },
};
