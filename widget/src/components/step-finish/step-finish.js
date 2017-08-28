import Help from '../help/help.vue';
import StartOver from '../start-over/start-over.vue';

export default {
  components: {
    Help,
    StartOver,
  },
  methods: {
    handlerReset() {
      this.$emit('reset');
    },
  },
};
