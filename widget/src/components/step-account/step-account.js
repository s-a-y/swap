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
      accountAddress: this.exchange.accountAddress,
      address: this.exchange.address,
      disableExtra: this.exchange.disableExtra,
      extra1: this.exchange.extra1,
      extra2: this.exchange.extra2,
    };
  },
  methods: {
    updateAccountAddress() {
      switch (this.currencyFrom) {
        case 'BTC': {
          this.accountAddress = this.account;
          this.disableExtra = false;
          this.extra1 = null;
          this.extra2 = null;
          break;
        }
        case 'XLM': {
          sender
            .getFederation(this.account)
            .then(
              ({ data }) => {
                this.accountAddress = data.account_id;
                this.disableExtra = Boolean(data.memo_type && data.memo);
                this.extra1 = data.memo_type;
                this.extra2 = data.memo;
              },
              () => {
                this.accountAddress = null;
                this.disableExtra = false;
                this.extra1 = null;
                this.extra2 = null;
              },
            );
          break;
        }
        default: {
          // do nothing
        }
      }
    },
    handlerInputAccount: debounce(function inputAccount() {
      this.updateAccountAddress();
    }, 300),
    handlerCompleteStep() {
      /**
       * extra1 - memoType, extra2 - memo
       */
      const optional = { extra1: this.extra1, extra2: this.extra2 };

      sender
        .getTransfer(this.currencyFrom, this.currencyTo, this.amountTo, this.accountAddress, optional)
        .then(({ data }) => {
          this.$emit('complete', {
            account: this.account,
            accountAddress: this.accountAddress,
            address: data.address,
            id: data.id,
            qr: data.qr,
            extra1: this.extra1,
            extra2: this.extra2,
            disableExtra: this.disableExtra,
          });
        });
    },
    isControlDisabled() {
      if (this.accountAddress) {
        return false;
      }

      return true;
    },
    isMemoEnable() {
      if (this.currencyFrom === 'BTC') {
        return false;
      }

      return true;
    },
  },
};
