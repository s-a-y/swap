export default {
  props: ['address', 'amount', 'currency', 'memoType', 'memo'],
  mounted() {
    window.STELLAR_QR_WIDGET.init({
      container: document.getElementById('stellar-qr'),
      amount: this.amount,
      currency: this.currency,
      destinationAddress: this.address,
      memoType: this.memoType,
      memo: this.memo,
    });
  },
};
