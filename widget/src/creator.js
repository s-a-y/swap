class ExchangeWidget {
  constructor(root) {
    this.origin = 'http://192.168.10.10:3000';
    this.root = root;
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('id', 'exchange-widget');
    this.iframe.setAttribute('src', this.origin);
    this.iframe.setAttribute('width', '100%');
    this.root.append(this.iframe);

    window.addEventListener('message', event => this.setIframeHeight(event));
  }

  setIframeHeight(event) {
    if (event.origin === this.origin) {
      this.iframe.setAttribute('height', event.data);
    }
  }
}

window.ExchangeWidget = ExchangeWidget;
