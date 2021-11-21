
const express = require('express');
const router = express.Router();
const logger = require('./api-logger');

/**
 * @typedef Response
 * @property {integer} count
 */

/**
 * Live
 * @route GET /health/live
 * @group Liveness - health
 * @produces application/json
 * @consumes application/json
 * @returns {Response.model} 200 - Status OK
 * @returns {Error}  503 - Unexpected error
 */

router.get('/live', async (req, res) => {
   
    let obj = "ok"
    res.status(200).json(obj);
	
});

router.get('/read', async (req, res) => {

    res.status(204).json();

});

module.exports = app => app.use('/v1/health', router);