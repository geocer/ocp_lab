const express = require('express');
const http = require("http");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const morgan = require('morgan');
const json = require('morgan-json');
const logger = require('./api-logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const format = json({
    'method': ':method',
    'url': ':url',
    'status': ':status',
    'length': ':res[content-length]',
    'response-time': ':response-time'
});

app.use(morgan(format));

const SERVER_PORT = Number(process.env.SERVER_PORT) || 8080;

let host = `localhost:${SERVER_PORT}`;
let _schemas = "http";

if (process.env.OPENSHIFT_DEPLOYMENT_NAMESPACE) {
    host = `api-backend-${process.env.OPENSHIFT_DEPLOYMENT_NAMESPACE}.apps.lab.com.br`;
    _schemas = "https";
}

if (process.env.OPENSHIFT_BUILD_NAMESPACE) {
    host = `api-backend-${process.env.OPENSHIFT_BUILD_NAMESPACE}.apps.lab.com.br`;
    _schemas = "https";
}

let options = {
    swaggerDefinition: {
        info: {
            description: 'Cloud/Devops Gerdau',
            title: 'API Cloud/Devops Gerdau',
            version: '1.0.0',
        },
        host: `${host}`,
        basePath: '/v1',
        produces: [
            "application/json",
            "application/json"
        ],
        schemes: [_schemas]
    },
    basedir: __dirname, //app absolute path
    files: ['./*route*.js'] //Path to the API handle folder
};
expressSwagger(options);

// SERVER
const server = http.createServer(app);

server.listen(SERVER_PORT, function () {
    logger.info(`API Backend server start in port ${SERVER_PORT}`);
});

app.options('*', cors());
app.use(cors());

app.get('/', function (req, res) {
    res.redirect('/api-docs/');
});

require('./api-health')(app);
require('./api-backend-router')(app);