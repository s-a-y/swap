import { memoTypes } from '../../configs';

export default {
  props: ['currencyFrom', 'currencyTo', 'amountFrom', 'amountTo'],
  data() {
    return {
      memoTypes,
    };
  },
};
