import debounce from '../../utils/debounce';
import { memoTypes } from '../../configs';
import sender from '../../services/sender';

export default {
  props: ['exchange'],
  data() {
    return {
      memoTypes,
      currencyFrom: this.exchange.currencyFrom,
      currencyTo: this.exchange.currencyTo,
      amountFrom: this.exchange.amountFrom,
      amountTo: this.exchange.amountTo,
      account: this.exchange.account,
      address: this.exchange.address,
      disableExtra: this.exchange.disableExtra,
      extra1: this.exchange.extra1,
      extra2: this.exchange.extra2,
    };
  },
  methods: {
    handlerInputAccount: debounce(function inputAccount() {
      sender
        .getFederation(this.account)
        .then(
          ({ data }) => {
            this.address = data.account_id;
            this.disableExtra = Boolean(data.memo_type && data.memo);
            this.extra1 = data.memo_type;
            this.extra2 = data.memo;
          },
          () => {
            this.address = null;
            this.disableExtra = false;
            this.extra1 = null;
            this.extra2 = null;
          },
        );
    }, 300),
    handlerCompleteStep() {
      /**
       * extra1 - memoType, extra2 - memo
       */
      const optional = { extra1: this.extra1, extra2: this.extra2 };

      sender
        .getTransfer(this.currencyFrom, this.currencyTo, this.amountTo, this.address, optional)
        .then(({ data }) => {
          this.$emit('complete', {
            id: data.id,
            address: data.address,
            url: data.url,
            qr: data.qr,
            extra1: this.extra1,
            extra2: this.extra2,
            account: this.account,
            disableExtra: this.disableExtra,
          });
        });
    },
    isControlDisabled() {
      if (this.address) {
        return false;
      }

      return true;
    },
  },
};
