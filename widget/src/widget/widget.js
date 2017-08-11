import './widget.less';

export default class Widget {
  constructor() {
    window.addEventListener('load', this.postHeight);
    window.addEventListener('resize', this.postHeight);
  }

  postHeight() {
    const body = document.querySelector('body');
    this.parent.postMessage(body.offsetHeight, '*');
  }
}
