import config from '../config';

const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const path = require('path');


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', serveStatic(path.join(__dirname, 'public')));
app.use('/', require('./routes'));


function StartHttp() {
  server.listen(config.PORT, () => {
    console.log(`Start server At ${config.PORT}`);
  });
}

module.exports = {
  server,
  StartHttp,
};
