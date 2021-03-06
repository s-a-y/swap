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
      exchange: new Exchange(window.location.search.split('=').pop() || 'ja87hmb1'),
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
      window.parent.postMessage({
        type: 'postHeight',
        data: body.offsetHeight,
      }, '*');
    },
    nextStep() {
      this.step = this.steps[this.stepIndex + 1];
    },
    handlerChangeStep(step) {
      this.step = step;
    },
    handlerReset() {
      this.exchange = new Exchange(window.location.search.split('=').pop() || 'ja87hmb1');
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
  computed: {
    stepIndex() {
      return this.steps.findIndex(step => step === this.step);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.postHeight);
      this.postHeight();
    });
  },
};
