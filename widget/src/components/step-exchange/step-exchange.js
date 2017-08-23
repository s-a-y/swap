import { currencies } from '../../configs';
import sender from '../../services/sender';
import rateParser from '../../utils/rateParser';
import debounce from '../../utils/debounce';

export default {
  props: ['initialCurrencyFrom', 'initialCurrencyTo', 'initialAmountTo'],
  data() {
    return {
      currencies,
      currencyFrom: this.initialCurrencyFrom,
      currencyTo: this.initialCurrencyTo,
      amountTo: this.initialAmountTo,
      amountFrom: null,
      minerFee: null,
      exchangeFee: null,
      exchangeRate: null,
    };
  },
  methods: {
    handlerCompleteStep() {
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
  },
  created() {
    this.updateRates();
  },
};
