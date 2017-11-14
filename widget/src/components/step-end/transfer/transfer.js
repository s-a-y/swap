import TransferAddress from './transfer-address/transfer-address.vue';
import StellarQr from './stellar-qr/stellar-qr.vue';

export default {
  props: ['currencyFrom', 'amountFrom', 'address', 'extra1', 'extra2', 'qr'],
  components: {
    TransferAddress,
    StellarQr,
  },
};
