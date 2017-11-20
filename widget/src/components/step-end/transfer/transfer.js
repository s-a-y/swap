import QRImage from 'qr-image';
import TransferAddress from './transfer-address/transfer-address.vue';
import StellarQr from './stellar-qr/stellar-qr.vue';

export default {
  props: ['currencyFrom', 'amountFrom', 'address', 'extra1', 'extra2', 'qr'],
  mounted() {
    this.qr = this.currencyFrom === 'BTC'
      ? QRImage.imageSync(`bitcoin:${this.address}?amount=${this.amountFrom}`, { type: 'svg' })
      : null;
  },
  components: {
    TransferAddress,
    StellarQr,
  },
};
