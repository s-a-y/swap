import Vue from 'vue';

import './less/index.less';

import Widget from './components/widget/widget.vue';

new Vue({ // eslint-disable-line
  el: '#widget',
  render: createElement => createElement(Widget),
});
