import './widget.less';

export default class Widget {
  static postHeight() {
    const body = document.querySelector('body');
    window.parent.postMessage(body.offsetHeight, '*');
  }

  constructor() {
    window.addEventListener('load', Widget.postHeight);
    window.addEventListener('resize', Widget.postHeight);
  }
}
