import { currencies } from '../../configs';
import sender from '../../services/sender';
import rateParser from '../../utils/rateParser';
import debounce from '../../utils/debounce';

export default {
  props: ['exchange'],
  data() {
    return {
      currencies,
      currencyFrom: this.exchange.currencyFrom,
      currencyTo: this.exchange.currencyTo,
      amountTo: this.exchange.amountTo,
      amountFrom: null,
      minerFee: null,
      exchangeFee: null,
      exchangeRate: null,
      controlDisabled: true,
    };
  },
  methods: {
    handlerCompleteStep() {
      if (this.isControlDisabled()) {
        return;
      }

      this.$emit('complete', {
        amountFrom: this.amountFrom,
        amountTo: this.amountTo,
        currencyFrom: this.currencyFrom,
        currencyTo: this.currencyTo,
      });
    },
    updateRates() {
      sender
        .getRates(this.currencyFrom, this.currencyTo, this.amountTo)
        .then(({ data }) => {
          const rate = rateParser(data);
          Object.assign(this, rate);
        });
    },
    handlerChangeAmountTo: debounce(function changeAmountTo() {
      this.updateRates();
    }, 300),
    handlerChangeCurrencyTo() {
      const currencyFrom = currencies.find(currency => currency.value !== this.currencyTo);
      this.currencyFrom = currencyFrom.value;
      this.amountTo = this.amountFrom;
      this.amountFrom = null;
      this.minerFee = null;
      this.exchangeFee = null;
      this.exchangeRate = null;
      this.updateRates();
    },
    isControlDisabled() {
      if (this.currencyFrom && this.currencyTo && this.amountFrom && this.amountTo) {
        return false;
      }

      return true;
    },
  },
  created() {
    this.updateRates();
  },
};
