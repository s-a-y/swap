const express = require('express');
const path = require('path');

const logger = require('./logger');
const configs = require('./configs');

const app = express();

app.use('/', express.static('widget', { index: ['index.html'] }));
app.use('/public', express.static(path.resolve(__dirname, 'widget/dist/public')));

const serverPort = configs.get('SERVER_PORT');
app.listen(serverPort, () => {
  logger.log(`Server start on port ${serverPort}!`);
});
