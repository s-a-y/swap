const express = require('express');

const logger = require('./logger');
const configs = require('./configs');

const app = express();

app.use('/', express.static('widget', { index: ['index.html'] }));

const serverPort = configs.get('SERVER_PORT');
app.listen(serverPort, () => {
  logger.log(`Server start on port ${serverPort}!`);
});
