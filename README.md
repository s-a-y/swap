# SWAP - exchange widget

Widget for currency swap, running on top of Stellar decentralized exchange.

Live demo can be found [here](https://apay.io/widget/demo.html)

## Run locally
1. npm i
2. npm run build
3. copy .env.example -> .env
4. npm start
5. http://localhost:3000/demo.html

## Place on your website

```$html
<div id="exchange-widget" style="width: 250px;"></div>
<script src="https://swap.apay.io/widget/dist/exchange-widget.js"></script>
<script>
  (function() {
    var root = document.getElementById('exchange-widget');
    new ExchangeWidget('https://swap.apay.io/widget/index.html', root, '<YourAPIToken>');
  })()
</script>
```