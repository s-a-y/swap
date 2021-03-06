import { currencies } from '../../configs';
import sender from '../../services/sender';
import rateParser from '../../utils/rate-parser';
import debounce from '../../utils/debounce';

export default {
  props: ['exchange'],
  data() {
    return {
      currencies,
      error: false,
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
      this.$emit('complete', {
        amountFrom: this.amountFrom,
        amountTo: this.amountTo,
        currencyFrom: this.currencyFrom,
        currencyTo: this.currencyTo,
      });
    },
    updateRates() {
      this.exchangeRate = null;
      this.amountFrom = null;
      sender
        .getRates(this.currencyFrom, this.currencyTo, this.amountTo, this.exchange.token)
        .then(
          ({ data }) => {
            const rate = rateParser(data);
            this.error = false;
            if (rate.amountTo == this.amountTo) {
              Object.assign(this, rate);
            }
          },
          () => {
            this.error = true;
          },
        );
    },
    handlerChangeAmountTo: debounce(function changeAmountTo() {
      if (this.amountTo > 0) {
        this.updateRates();
      }
    }, 700),
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
    handlerSwapCurrencies() {
      const amountFrom = this.amountFrom;
      const currencyFrom = this.currencyFrom;
      this.currencyFrom = this.currencyTo;
      this.amountFrom = null;
      this.currencyTo = currencyFrom;
      this.amountTo = amountFrom;
      this.minerFee = null;
      this.exchangeFee = null;
      this.exchangeRate = null;
      this.updateRates();
    },
    isControlDisabled() {
      if (this.error) {
        return true;
      }

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
