import StepExchange from '../step-exchange/step-exchange.vue';
import StepAccount from '../step-account/step-account.vue';
import StepFinish from '../step-finish/step-finish.vue';

export default {
  name: 'widget',
  data() {
    const steps = ['exchange', 'account', 'finish'];

    return {
      steps,
      step: steps[0],
    };
  },
  components: {
    StepAccount,
    StepExchange,
    StepFinish,
  },
  methods: {
    postHeight() {
      const body = document.querySelector('body');
      window.parent.postMessage(body.offsetHeight, '*');
    },
    handlerChangeStep(step) {
      this.step = step;
    },
    handlerReset() {
      this.step = this.steps[0];
    },
  },
  created() {
    window.addEventListener('resize', this.postHeight);
    this.postHeight();
  },
};
