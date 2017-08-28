import Help from '../help/help.vue';

export default {
  components: {
    Help,
  },
  methods: {
    handlerReset() {
      this.$emit('reset');
    },
  },
};
