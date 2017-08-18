import StepExchange from '../step-exchange/step-exchange.vue';
import StepAccount from '../step-account/step-account.vue';

export default {
  name: 'widget',
  data() {
    const steps = ['exchange', 'account'];

    return {
      steps,
      step: steps[0],
    };
  },
  components: {
    StepAccount,
    StepExchange,
  },
  methods: {
    postHeight() {
      const body = document.querySelector('body');
      window.parent.postMessage(body.offsetHeight, '*');
    },
    handlerChangeStep(step) {
      this.step = step;
    },
  },
  created() {
    window.addEventListener('resize', this.postHeight);
    this.postHeight();
  },
};
