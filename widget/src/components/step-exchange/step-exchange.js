import { currencies } from '../../configs';
import sender from '../../services/sender';

export default {
  data() {
    const currencyFrom = currencies[0];
    const currencyTo = currencies.find(currency => currency.value !== currencyFrom.value);

    return {
      currencies,
      currencyFrom: currencyFrom.value,
      currencyTo: currencyTo.value,
    };
  },
  methods: {
    handlerCompleteStep() {
      sender
        .getRates('BTC', 'XLM', 145600);
    },
  },
  watch: {
    currencyFrom(currencyFrom) {
      const currencyTo = currencies.find(currency => currency.value !== currencyFrom);
      this.currencyTo = currencyTo.value;
    },
  },
};
