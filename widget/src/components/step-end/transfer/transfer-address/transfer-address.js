import Clipboard from 'clipboard';

export default {
  props: ['address'],
  mounted() {
    this.clipboard = new Clipboard(this.$refs.btn, {
      target: () => this.$refs.address,
    });
  },
  destroyed() {
    this.clipboard.destroy();
  },
};
