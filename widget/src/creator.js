class ExchangeWidget {
  constructor(origin, root) {
    this.origin = origin;
    this.root = root;
    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('id', 'exchange-widget');
    this.iframe.setAttribute('src', this.origin);
    this.iframe.setAttribute('width', '100%');
    this.iframe.setAttribute('style', 'border: none;');
    this.root.append(this.iframe);

    window.addEventListener('message', event => this.setIframeHeight(event));
  }

  setIframeHeight(event) {
    if (event.data && event.data.type === 'postHeight') {
      this.iframe.setAttribute('height', event.data.data);
    }
  }
}

window.ExchangeWidget = ExchangeWidget;
