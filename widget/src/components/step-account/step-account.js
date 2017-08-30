import { memoTypes } from '../../configs';
import sender from '../../services/sender';

export default {
  props: ['currencyFrom', 'currencyTo', 'amountFrom', 'amountTo'],
  data() {
    return {
      memoTypes,
    };
  },
  methods: {
    handlerCompleteStep() {
      const address = 'GBQWA6DU6OXHH4AVTFCONQ76LHEWQVZAW7SFSW4PPCAI2NX4MJDZUYDW';

      sender
        .getTransfer(this.currencyFrom, this.currencyTo, this.amountTo, address)
        .then(({ data }) => {
          this.$emit('complete', {
            id: data.id,
            address: data.address,
            url: data.url,
            qr: data.qr,
            extra1: data.extra1,
            extra2: data.extra2,
          });
        });
    },
  },
};
