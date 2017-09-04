import StepExchange from '../step-exchange/step-exchange.vue';
import StepAccount from '../step-account/step-account.vue';
import StepEnd from '../step-end/step-end.vue';
import Info from '../info/info.vue';
import Exchange from '../../entities/exchange';

export default {
  name: 'widget',
  data() {
    const steps = ['exchange', 'account', 'end'];

    return {
      steps,
      step: steps[0],
      exchange: new Exchange(),
    };
  },
  components: {
    Info,
    StepAccount,
    StepExchange,
    StepEnd,
  },
  methods: {
    postHeight() {
      const body = document.querySelector('body');
      window.parent.postMessage(body.offsetHeight, '*');
    },
    nextStep() {
      const stepIndex = this.steps.findIndex(step => step === this.step);
      this.step = this.steps[stepIndex + 1];
    },
    handlerChangeStep(step) {
      this.step = step;
    },
    handlerReset() {
      this.exchange = new Exchange();
      this.step = this.steps[0];
    },
    handlerCompleteStep(data) {
      if (data) {
        Object.keys(data).forEach((key) => {
          this.exchange[key] = data[key];
        });
      }
      this.nextStep();
    },
  },
  created() {
    window.addEventListener('resize', this.postHeight);
    this.postHeight();
  },
};
