const express = require('express');
const router = express.Router();
const logger = require('./api-logger');

/**
 * @typedef Request
 * @property {string} chars - Retorna nome informado.
 */

router.post('/request', async (req, res) => {

    try {
        
        logger.debug(req.body);
        let obj = req.body
        return res.status(200).json(obj);

    } catch (e) {

        console.error(e);

        return res.status(500).json(e);

    }

});

module.exports = app => app.use('/v1', router);